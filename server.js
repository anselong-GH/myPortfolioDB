// *********************************DEPENDENCIES************************************
const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

// *************************************APP SETUP***********************************
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: ["https://anselong-gh.github.io/myPortfolioDB",
        "https://anselong-gh.github.io"],
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: "none",
        secure: true
    }
}));

// **********************************MongoDB Connection***********************************
const client = new MongoClient(process.env.MONGO_URI);
let usersCollection, aboutMeCollection;

async function initDB() {
    try {
        await client.connect();
        const db = client.db("myPortfolioDB");
        usersCollection = db.collection("users");
        aboutMeCollection = db.collection("useraboutme");

        await usersCollection.createIndex({ username: 1 }, { unique: true });
        await usersCollection.createIndex({ email: 1 }, { unique: true });

        console.log("✅ Connected to MongoDB Atlas and collections ready!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}
initDB();

// **********************************Signup Route***********************************
app.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hash = bcrypt.hashSync(password, 10);

        await usersCollection.insertOne({
            username,
            email,
            passwordHash: hash,
            bio: "",
            skills: [],
            cvName: ""
        });

        res.json({ success: true, redirect: "https://anselong-gh.github.io/myPortfolioDB/Login.html" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: "Username or email already exists" });
        }
        res.status(500).json({ success: false, error: "Error Creating User" });
    }
});

// *****************************Login Route***********************************
app.post('/login', async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;
        const user = await usersCollection.findOne({ username });

        if (!user) {
            return res.json({ success: false, error: "User not found", redirect: "https://anselong-gh.github.io/myPortfolioDB/Login.html?error=User+not+found" });
        }

        if (bcrypt.compareSync(password, user.passwordHash)) {
            req.session.user = user;
            if (rememberMe) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            return res.json({ success: true, redirect: "https://anselong-gh.github.io/myPortfolioDB/Dashboard.html" });
        } else {
            return res.json({ success: false, error: "Invalid password", redirect: "https://anselong-gh.github.io/myPortfolioDB/Login.html?error=Invalid+password" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// ***********************************FETCH CV / UPLOAD / ABOUT ME***********************************
// (keep your CV upload, getCV, UserAboutMe routes as we finalized earlier)

// ********************************Logout Route*************************************
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ success: false, error: "Error logging out" });
        res.json({ success: true, redirect: "https://anselong-gh.github.io/myPortfolioDB/Logout.html" });
    });
});

// ********************************START SERVER**************************************
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
