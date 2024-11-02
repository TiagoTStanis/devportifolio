const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("backgroundVideo");
    const playPauseButton = document.getElementById("playPauseButton");
    const muteToggleButton = document.getElementById("muteToggleButton");

    video.volume = 0.9;

    video.addEventListener("click", function(event) {
        if (event.target !== menuToggle && event.target !== mobileMenu) {
            if (video.paused) {
                video.play();
                playPauseButton.style.display = "none";
            } else {
                video.pause();
                playPauseButton.style.display = "flex";
            }
        }
    });

    playPauseButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseButton.style.display = "none";
        } else {
            video.pause();
            playPauseButton.style.display = "flex";
        }
    });

    muteToggleButton.addEventListener("click", function() {
        video.muted = !video.muted;
        muteToggleButton.textContent = video.muted ? "Ativar Som" : "Desativar Som";
    });

    if (video.paused) {
        playPauseButton.style.display = "flex";
    }
});

menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    mobileMenu.classList.toggle('show');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        document.querySelectorAll('section').forEach(section => section.classList.remove('fade-enter-active'));
        targetSection.classList.add('fade-enter', 'fade-enter-active');

        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
