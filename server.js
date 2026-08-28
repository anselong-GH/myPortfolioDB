// *********************************DEPENDENCIES************************************
const express = require('express'); // build routes
const bcrypt = require('bcryptjs'); // hashing pw securely before storing
const session = require('express-session'); // manage user sessions (keep users logged in upon request)
const cors = require('cors'); // allow cross-domain requests
const db = require('./database'); // your MySQL connection file
const multer = require('multer'); // handling file uploads
const pdfParse = require('pdf-parse'); // extract text from pdf
const mammoth = require('mammoth'); // extract text from docs
const fs = require('fs'); // file system module - read/write files

// *************************************APP SETUP***********************************
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for GitHub Pages frontend
app.use(cors({
    origin: ["https://anselong-gh.github.io/myPortfolioDB",
             "https://anselong-gh.github.io"],
    credentials: true
}));

// Session setup (secure for cross-domain)
app.use(session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: "none",
        secure: true
    }
}));

// **********************************Signup Route***********************************
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query(
        'INSERT INTO user (Username, Password_Hash, Email) VALUES (?, ?, ?)',
        [username, hash, email],
        (err) => {
            if (err) {
                console.error("Signup error:", err);
                return res.status(500).send('Error creating user');
            }
            console.log("✅ User created:", username);
            res.redirect('https://anselong-gh.github.io/myPortfolioDB/Login.html');
        }
    );
});

// *****************************Login Route***********************************
app.post('/login', (req, res) => {
    const { username, password, rememberMe } = req.body;
    db.query('SELECT * FROM user WHERE Username = ?', [username], (err, results) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).send('Error');
        }
        if (results.length === 0) {
            return res.redirect('https://anselong-gh.github.io/myPortfolioDB/Login.html?error=User+not+found');
        }

        const user = results[0];
        if (bcrypt.compareSync(password, user.Password_Hash)) {
            req.session.user = user;

            if (rememberMe) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days
            }

            // ✅ No OTP — go straight to dashboard
            res.redirect('https://anselong-gh.github.io/myPortfolioDB/Dashboard.html');
        } else {
            res.redirect('https://anselong-gh.github.io/myPortfolioDB/Login.html?error=Invalid+password');
        }
    });
});

// **********************************CV PAGE*****************************************
app.get('/CV', (req, res) => {
    if (!req.session.user) {
        return res.redirect("https://anselong-gh.github.io/myPortfolioDB/Login.html");
    }
    res.redirect("https://anselong-gh.github.io/myPortfolioDB/CV.html");
});

// **********************************UPDATE ABOUT ME**********************************
app.get('/UserAboutMe', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');

    db.query(
        'SELECT CVName, CVTitle, CVTitleDesc, CVSkills, CVExperience, CVAchievements FROM useraboutme WHERE Username=?',
        [req.session.user.Username],
        (err, results) => {
            if (err) return res.status(500).send('Error loading profile');
            if (results.length === 0) return res.json({});

            const user = results[0];
            const safeParse = (str) => {
                try { return JSON.parse(str || "[]"); } catch { return []; }
            };

            res.json({
                name: user.CVName,
                careerTitle: user.CVTitle,
                careerDesc: user.CVTitleDesc,
                skills: safeParse(user.CVSkills),
                workExp: safeParse(user.CVExperience),
                achievements: safeParse(user.CVAchievements)
            });
        }
    );
});

app.post('/UserAboutMe', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');

    const { CVName, CVTitle, CVTitleDesc, CVSkills, CVExperience, CVAchievements } = req.body;

    db.query(
        'UPDATE useraboutme SET CVName=?, CVTitle=?, CVTitleDesc=?, CVSkills=?, CVExperience=?, CVAchievements=? WHERE Username=?',
        [
            CVName,
            CVTitle,
            CVTitleDesc,
            JSON.stringify(CVSkills || []),
            JSON.stringify(CVExperience || []),
            JSON.stringify(CVAchievements || []),
            req.session.user.Username
        ],
        (err) => {
            if (err) return res.status(500).send('Error saving profile');
            res.json({ success: true });
        }
    );
});

// **********************************CV UPLOAD**************************************
const upload = multer({ dest: 'uploads/' });

app.post('/uploadCV', upload.single('cv'), async (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');

    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    let text = "";

    try {
        if (fileType === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            text = pdfData.text;
        } else if (fileType.includes('word')) {
            const result = await mammoth.extractRawText({ path: filePath });
            text = result.value;
        } else {
            text = fs.readFileSync(filePath, 'utf8');
        }

        const emailMatch = text.match(/[\w\.-]+@[\w\.-]+/);
        const phoneMatch = text.match(/\+?\d[\d\s-]{8,}/);

        const digitalCV = {
            name: "Unknown",
            email: emailMatch ? emailMatch[0] : null,
            phone: phoneMatch ? phoneMatch[0] : null,
            raw_text: text
        };

        db.query(
            'UPDATE user SET CVName=?, CVEmail=?, CVPhone=?, CVRawText=? WHERE ID=?',
            [
                digitalCV.name,
                digitalCV.email,
                digitalCV.phone,
                digitalCV.raw_text,
                req.session.user.ID
            ],
            (err) => {
                if (err) {
                    console.error("CV save error:", err);
                    return res.status(500).send({ error: 'Failed to save CV' });
                }
                console.log("✅ CV saved for user:", req.session.user.Username);
                res.json(digitalCV);
            }
        );

    } catch (err) {
        console.error("CV upload error:", err);
        res.status(500).send({ error: 'Failed to parse CV' });
    } finally {
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error("File cleanup error:", unlinkErr);
        });
    }
});

// ***********************************FETCH CV*************************************
app.get('/getCV', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');

    db.query('SELECT CVName, CVEmail, CVPhone, CVRawText FROM user WHERE ID=?',
        [req.session.user.ID],
        (err, results) => {
            if (err) return res.status(500).send('Error loading CV');
            res.json(results[0] || {});
        }
    );
});

// ********************************Logout Route*************************************
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Error logging out");
        }
        res.redirect('https://anselong-gh.github.io/myPortfolioDB/Logout.html');
    });
});

// ********************************START SERVER**************************************
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
