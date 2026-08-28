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

  // If you still want language selector, keep this
  const langSelect = document.getElementById("language-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      console.log("Language change to:", e.target.value);
    });
  }
}
loadNavbar();

// ✅ Backend session check for protected page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://your-app.onrender.com/profile", {
      method: "GET",
      credentials: "include"
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User profile:", data);
      // Example: show welcome message
      const welcomeMsg = document.getElementById("welcomeMsg");
      if (welcomeMsg) {
        welcomeMsg.textContent = `Welcome, ${data.username}!`;
      }
    } else {
      window.location.href = "Login.html";
    }
  } catch (err) {
    console.error("Profile check failed:", err);
    window.location.href = "Login.html";
  }
});
