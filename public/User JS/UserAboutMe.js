window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/UserAboutMe");
        if (!response.ok) throw new Error("Not logged in");

        const data = await response.json();

        // Populate fields
        if (data.CVName) document.getElementById("userName").innerText = data.CVName;
        if (data.CVTitle) document.getElementById("careerTitle").innerText = data.CVTitle;
        if (data.CVTitleDesc) document.getElementById("careerDesc").innerText = data.CVTitleDesc;

        const populateList = (id, items) => {
            const list = document.getElementById(id);
            list.innerHTML = "";
            (items || []).forEach(item => {
                const li = document.createElement("li");
                li.contentEditable = "true";
                li.innerText = item;
                list.appendChild(li);
            });
        };

        populateList("skillsList", data.CVSkills);
        populateList("workExpList", data.CVExperience);
        populateList("achievementsList", data.CVAchievements);

    } catch (err) {
        console.error(err);
        alert("Error loading profile");
    }
});

// Save profile
document.getElementById("saveProfileBtn").addEventListener("click", async () => {
    const profileData = {
        CVName: document.getElementById("userName").innerText,
        CVTitle: document.getElementById("careerTitle").innerText,
        CVTitleDesc: document.getElementById("careerDesc").innerText,
        CVSkills: Array.from(document.querySelectorAll("#skillsList li")).map(li => li.innerText),
        CVExperience: Array.from(document.querySelectorAll("#workExpList li")).map(li => li.innerText),
        CVAchievements: Array.from(document.querySelectorAll("#achievementsList li")).map(li => li.innerText)
    };

    const response = await fetch("/UserAboutMe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
    });

    if (response.ok) {
        alert("Profile saved!");
    } else {
        alert("Error saving profile");
    }
});
