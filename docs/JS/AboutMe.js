
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');

        navBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(targetSection).classList.add('active');
    });
});