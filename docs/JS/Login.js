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

    loginForm.addEventListener("submit", async (e) => {
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

        try {
            // ✅ Call your Render backend
            const response = await fetch("https://your-app.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // important for sessions
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome back, ${username}!`);

                // Remember Me logic
                if (rememberMe.checked) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("rememberMe", "true");
                    localStorage.setItem("savedUsername", username);
                } else {
                    sessionStorage.setItem("isLoggedIn", "true");
                    localStorage.removeItem("rememberMe");
                    localStorage.removeItem("savedUsername");
                }

                window.location.href = "UserHome.html";
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Server error. Please try again later.");
        }
    });
});

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn");
    window.location.location.href = "Login.html";

}