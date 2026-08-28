
// Signup form validation
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", (e) => {
        const email = signupForm.email.value.trim();
        const username = signupForm.username.value.trim();
        const password = signupForm.password.value.trim();

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        // Stop submission only if invalid
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
        }

        if (username.length < 5) {
            alert("Username must be at least 5 characters long.");
            e.preventDefault();
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            e.preventDefault();
        }
    });
});
