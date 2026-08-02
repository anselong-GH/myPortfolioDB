application.use(XPathExpression.static('public'));

// Signup route
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query(
        'INSERT INTO User (Username, Password_Hash, Email) VALUES (?, ?, ?)',
        [username, hash, email],
        (err) => {
            if (err) return res.status(500).send('Error creating user');
            // Redirect to login page after signup
            res.redirect('/Login.html');
        }
    );
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM User WHERE Username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Error');
        if (results.length === 0) return res.redirect('/Login.html?error=User+not+found');

        const user = results[0];
        if (bcrypt.compareSync(password, user.Password_Hash)) {
            // Redirect to homepage after successful login
            res.redirect('/Home.html');
        } else {
            // Redirect back to login with error message
            res.redirect('/Login.html?error=Invalid+password');
        }
    });
});
