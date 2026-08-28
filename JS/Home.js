//AMew
function loadNavbar() {
  const navbarHTML = `
  <nav class ="navbar">
  <div class="logo">MewA</div> 
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-links">
        <a href="Home.html" class="active">Home</a>
        <a href="AboutMe.html">About Me</a>
        <a href="Privacy.html">Privacy Policy</a>
        <a href="Login.html">Login</a>
        <a href="Signup.html">Sign up</a>
        <select id="language-select">
          <option value="en" selected>English</option>
          <option value="zh">中文</option>
          <option value="ms">Malay</option>
        </select>
      </div>
    </nav>
  `;
  document.getElementById("navbar").innerHTML = navbarHTML;

  // Navigation Bar Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // animate into X
  });

  const langSelect = document.getElementById("language-select");
  langSelect.addEventListener("change", (e) => {
    // language switching logic starts here
    console.log("Language change to:", e.target.value);
  });
}
loadNavbar();


// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


// COPY RIGHT FOOTER
function loadFooter() {
  const footerHTML = `
  <footer class="site-footer">
  <div class="footer-container">
  <!--------------
  |   BRANDING   |
  ---------------!>
   <div class="footer-brand">
   <img src="IMAGE/MyLogo.jpg" alt="Brand Logo" class="footer-logo">
   <p class="footer-tagline">Promoting Digital Portfolio for Career Growth</p>
   </div>
   
   <!------------------
   |   SOCIAL-LINKS   |
   -------------------!>
   <div class="footer-social">

  <!--------------
  |   FACEBOOK   |
  ---------------!>
  <a href="https://www.facebook.com/share/1DQUHpS14W/" 
  class= "facebook" target="_blank" aria-label="Facebook">
  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 
  3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h
  -2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 
  1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 
  1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 
  6.75-7.951"/>
  </svg>
  </a>
  
  <!---------------
  |   INSTAGRAM   |
  ----------------!>
  <a href="https://www.instagram.com/13a013a0?igsi=bTJwMGRnYmphcnls" 
  class="instagram" target="_blank" aria-label="Instagram">
  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 
  16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 
  2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 
  20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 
  16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 
  1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 
  1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
  </svg>
  </a>

          

<!--------------
|   LINKEDIN   |
---------------!>
  <a href="https://www.linkedin.com/in/ansel-ong-b825731a7/" 
  class="linkedin" target="_blank" aria-label="LinkedIn">
  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 
  0-2.137 1.445-2.137 2.939v5.667H9.345V9h3.414v1.561h.049c.476-.9 
  1.637-1.852 3.369-1.852 3.601 0 4.265 2.37 4.265 5.455v6.288zM5.337 
  7.433c-1.137 0-2.057-.926-2.057-2.065 0-1.138.92-2.065 
  2.057-2.065s2.057.927 2.057 2.065c0 1.139-.92 2.065-2.057 
  2.065zM6.777 20.452H3.897V9h2.88v11.452zM22.225 0H1.771C.792 
  0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 
  24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
  </a>
  </div>

<!----------------
|   COPY RIGHT   |
-----------------!>
<div class="footer-bottom">
  <p>&copy; <span id="year"></span> MewA. All rights reserved.</p>
</div>         
</footer>
`;

  // Inserting footer 1st
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = footerHTML;
  
  // This automatically updates the year (2026)
  document.getElementById("year").textContent = new Date().getFullYear();
  }
}
// Calling the function once
loadFooter();