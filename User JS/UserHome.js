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
        <a href="UserHome.html" class="active">Home</a>
        <a href="UserAboutMe.html">About Me</a>
        <a href="CV.html">CV Upload</a>
        <a href="UserProject.html">My Project</a>
        <a href="Logout.html">Log out</a>
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