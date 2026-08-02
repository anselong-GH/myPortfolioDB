// Signup form validation
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = signupForm.email.value.trim();
        const username = signupForm.username.value.trim();
        const password = signupForm.password.value.trim();

        // Basic email validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (username.length < 5) {
            alert("Username must be at least 5 characters long.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Simulate signup success (replace with backend call)
        alert(`Account created successfully for ${username}!`);
        // Example: send data to backend
        // fetch("/signup", { method: "POST", body: JSON.stringify({ email, username, password }) })
    });
});
