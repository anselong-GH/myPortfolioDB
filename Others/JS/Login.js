
// Login form validation
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent default submission

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (username === "" || password === "") {
            alert("Please fill in both fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Simulate login success (replace with backend call)
        alert(`Welcome back, ${username}!`);
        // Example: send data to backend
        // fetch("/login", { method: "POST", body: JSON.stringify({ username, password }) })

        // Redirect to another page after login
        window.location.href = "UserHome.html";

        // redirects but no login page in history
        // or use window.location.replace("dashboard.html");
    });
});

// After Successful Login
sessionStorage.setItem("isLoggedIn", "true");

// On Protected Pages
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "Login.html"; // Redirect to login page if not logged in
}