

document.addEventListener("DOMContentLoaded", () => {

    // Back to Top
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Cookie Banner
    const banner = document.getElementById("cookieBanner");

    if (banner && !localStorage.getItem("cookieConsent")) {
        banner.style.display = "block";
    }

    const accept = document.getElementById("acceptCookies");
    const reject = document.getElementById("rejectCookies");

    if (accept) {
        accept.onclick = () => {
            localStorage.setItem("cookieConsent", "accepted");
            banner.style.display = "none";
        };
    }

    if (reject) {
        reject.onclick = () => {
            localStorage.setItem("cookieConsent", "rejected");
            banner.style.display = "none";
        };
    }

});