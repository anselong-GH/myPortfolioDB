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
            const response = await fetch("https://your-app.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // important for sessions
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful! You can now log in.");
                window.location.href = "Login.html"; // redirect to login page
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Server error. Please try again later.");
        }
    });
});
