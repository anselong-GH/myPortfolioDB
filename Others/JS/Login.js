<<<<<<< HEAD:JS/Login.js
=======

// Login form validation
>>>>>>> 37a634c32d44b49991b694ebe417a68064c260b7:Others/JS/Login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    const usernameField = loginForm.username;
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("rememberMe");

    // Restore Remember Me state + credentials
    if (localStorage.getItem("rememberMe") === "true") {
        usernameField.value = localStorage.getItem("savedUsername") || "";
        passwordField.value = localStorage.getItem("savedPassword") || "";
        rememberMe.checked = true;
    }

    // Show/Hide Password Toggle
    togglePassword.addEventListener("click", () => {
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
        togglePassword.classList.toggle("active");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        if (username === "" || password === "") {
            alert("Please fill in both fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        alert(`Welcome back, ${username}!`);
<<<<<<< HEAD:JS/Login.js

        // ✅ Remember Me logic with credentials
        if (rememberMe.checked) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("savedUsername", username);
            localStorage.setItem("savedPassword", password);
        } else {
            sessionStorage.setItem("isLoggedIn", "true");
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
        }

        window.location.href = "UserHome.html";
    });
});

// On protected pages
if (
    localStorage.getItem("isLoggedIn") !== "true" &&
    sessionStorage.getItem("isLoggedIn") !== "true"
) {
    window.location.href = "Login.html";
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn");
    // ⚠️ Keep credentials if Remember Me was checked
    window.location.href = "Login.html";
}
=======
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
>>>>>>> 37a634c32d44b49991b694ebe417a68064c260b7:Others/JS/Login.js
