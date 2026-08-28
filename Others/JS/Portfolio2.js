// ************************************PORTFOLIO*************************************
app.get('/portfolio/:username', (req, res) => {
    db.query('SELECT * FROM user WHERE Username=?', [req.params.username], (err, results) => {
        if (err) return res.status(500).send('Error');
        if (results.length === 0) return res.status(404).send('Portfolio not found');

        const user = results[0];

        res.send(`
            <html>
            <head>
              <title>${user.Username}'s Portfolio</title>
              <link rel="stylesheet" href="/themes.css">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
              <script>
                function switchTheme(value) {
                  document.getElementById('cvContainer').className = value;
                }
                function downloadPDF() {
                  const element = document.getElementById('cvContainer');
                  const opt = {
                    margin: 0.5,
                    filename: '${user.Username}_CV.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                  };
                  html2pdf().set(opt).from(element).save();
                }
              </script>
            </head>
            <body>
              <h1>${user.Username}'s Portfolio</h1>
              <h2>About Me</h2>
              <p>${user.Bio || ''}</p>
              <p><strong>Skills:</strong> ${user.Skills || ''}</p>
              <p><strong>Projects:</strong> ${user.Projects || ''}</p>
              <h2>Digital CV</h2>
              <label for="themeSelector">Choose Theme:</label>
              <select id="themeSelector" onchange="switchTheme(this.value)">
                <option value="cv-modern">Modern</option>
                <option value="cv-creative">Creative</option>
                <option value="cv-classic">Classic</option>
              </select>
              <div id="cvContainer" class="cv-modern">
                <header>
                  <h1>${user.CVName || ''}</h1>
                  <p>${user.CVEmail || ''} | ${user.CVPhone || ''}</p>
                </header>
                <section>
                  <h2>Raw CV Text</h2>
                  <p>${user.CVRawText || ''}</p>
                </section>
              </div>
              <button onclick="downloadPDF()">Download as PDF</button>
            </body>
            </html>
        `);
    });
});