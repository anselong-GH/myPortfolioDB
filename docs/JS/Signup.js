// Signup form validation + backend call
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent default form submission

        const email = signupForm.email.value.trim();
        const username = signupForm.username.value.trim();
        const password = signupForm.password.value.trim();

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        // Client-side validation
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

        try {
            // ✅ Call your Render backend
            const response = await fetch("https://mewa-backend.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // important for sessions
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();

            if (data.success) {
                alert("Signup successful! You can now log in.");
                window.location.href = data.redirect; // use backend-provided redirect
            } else {
                alert(data.error || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Server error. Please try again later.");
        }
    });
});
