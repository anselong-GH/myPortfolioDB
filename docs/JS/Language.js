
// Translation dictionary
const translations = {
    en: {
        title: "My Portfolio",
        welcome: "Welcome to my homepage!"
    },
    ms: {
        title: "Portfolio Saya",
        welcome: "Selamat datang ke laman utama saya!"
    },
    zh: {
        title: "我的作品集",
        welcome: "欢迎来到我的主页！"
    }
};

// Function to set language
function setLanguage(lang) {
    // Update text content dynamically
    document.getElementById("title").textContent = translations[lang].title;
    document.getElementById("welcome").textContent = translations[lang].welcome;

    // Save preference
    localStorage.setItem("preferredLang", lang);
}

// Grab the language selector
const switcher = document.getElementById("language-select");

// Listen for changes
switcher.addEventListener("change", e => setLanguage(e.target.value));

// Load saved preference or default to English
const savedLang = localStorage.getItem("preferredLang") || "en";
switcher.value = savedLang;
setLanguage(savedLang);
