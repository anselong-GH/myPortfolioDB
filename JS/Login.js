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
    });
});