window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/UserProject");
        if (!response.ok) throw new Error("Not logged in");

        const data = await response.json();

        document.getElementById("projName").innerText = data.name || "";
        document.getElementById("projCareerTitle").innerText = data.careerTitle || "";
        document.getElementById("projCareerDesc").innerText = data.careerDesc || "";

        const populateList = (id, items) => {
            const list = document.getElementById(id);
            list.innerHTML = "";
            (items || []).forEach(item => {
                const li = document.createElement("li");
                li.innerText = item;
                list.appendChild(li);
            });
        };

        populateList("projSkills", data.skills);
        populateList("projWorkExp", data.workExp);
        populateList("projAchievements", data.achievements);

    } catch (err) {
        console.error(err);
        alert("Error loading project profile");
    }
});
