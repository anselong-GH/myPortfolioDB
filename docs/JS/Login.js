document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    const usernameField = loginForm.username;
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("rememberMe");

    if (localStorage.getItem("rememberMe") === "true") {
        usernameField.value = localStorage.getItem("savedUsername") || "";
        rememberMe.checked = true;
    }

    togglePassword.addEventListener("click", () => {
        passwordField.type = passwordField.type === "password" ? "text" : "password";
        togglePassword.classList.toggle("active");
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await fetch("https://mewa-backend.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password, rememberMe: rememberMe.checked })
            });

            const data = await response.json();
            if (data.success) {
                alert(`Welcome back, ${username}!`);
                if (rememberMe.checked) {
                    localStorage.setItem("rememberMe", "true");
                    localStorage.setItem("savedUsername", username);
                } else {
                    localStorage.removeItem("rememberMe");
                    localStorage.removeItem("savedUsername");
                }
                window.location.href = data.redirect;
            } else {
                alert(data.error || "Login failed");
                if (data.redirect) window.location.href = data.redirect;
            }
        } catch (err) {
            alert("Server error. Please try again later.");
        }
    });
});

function logout() {
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("savedUsername");
    window.location.href = "Login.html";
}
