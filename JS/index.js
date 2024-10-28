
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("backgroundVideo");
    const playPauseButton = document.getElementById("playPauseButton");

    video.volume = 0.9;

    video.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseButton.style.display = "none";
        } else {
            video.pause();
            playPauseButton.style.display = "flex";
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

    if (video.paused) {
        playPauseButton.style.display = "flex";
    }
});


menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});
