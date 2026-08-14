const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db'); // your MySQL connection file

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

const session = require('express-session');

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

// Signup Route
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query(
        'INSERT INTO User (Username, Password_Hash, Email) VALUES (?, ?, ?)',
        [username, hash, email],
        (err) => {
            if (err) {
                console.error("Signup error:", err);
                return res.status(500).send('Error creating user');
            }
            console.log("✅ User created:", username);
            res.redirect('/Login.html'); // redirect after success
        }
    );
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM User WHERE Username = ?', [username], (err, results) => {
        if (err) {
            console.error("Login error:", err); // log actual error
            return res.status(500).send('Error');
        }
        if (results.length === 0) return res.redirect('/Login.html?error=User+not+found');

        const user = results[0];
        if (bcrypt.compareSync(password, user.Password_Hash)) {
            req.session.user = user;   // store user in session
            res.redirect('/dashboard'); // redirect to dashboard instead of Home.html
        } else {
            // Redirect back to login with error message
            res.redirect('/Login.html?error=Invalid+password');
        }
    });
});

// Dashboard Route

app.get('/dashboard', (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect("/Login.html");
    }
    res.sendFile(__dirname + '/public/Dashboard.html');
});

// Update Profile Route
app.post('/updateProfile', (req, res) => {
    const { homepageText, bio, skills, projects } = req.body;
    const username = req.session.user.Username;

    db.query(
        'UPDATE User SET HomepageText=?, Bio=?, Skills=?, Projects=? WHERE Username=?',
        [homepageText, bio, skills, projects, username],
        (err) => {
            if (err) return res.status(500).send('Error updating profile');
            res.redirect('/portfolio/' + username);
        }
    );
});

// Portfolio Route 

app.get('/portfolio/:username', (req, res) => {
    db.query('SELECT * FROM User WHERE Username=?', [req.params.username], (err, results) => {
        if (err) return res.status(500).send('Error');
        if (results.length === 0) return res.status(404).send('Portfolio not found');

        const user = results[0];
        res.send(`
            <h2>${user.Username}'s Homepage</h2>
            <p>${user.HomepageText || ''}</p>

            <h3>About Me</h3>
            <p>${user.Bio || ''}</p>
            <p><strong>Skills:</strong> ${user.Skills || ''}</p>

            <h3>Projects</h3>
            <p>${user.Projects || ''}</p>
        `);
    });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Error logging out");
        }
        res.redirect('/Logout.html'); // send user to logout page
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));