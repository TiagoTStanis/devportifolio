
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("backgroundVideo");
    const muteToggleButton = document.getElementById("muteToggleButton");

    video.volume = 0.9;

    muteToggleButton.addEventListener("click", function() {
        if (video.paused) {
            video.play().catch(error => {
                console.log("Erro ao tentar reproduzir o vídeo:", error);
            });
        }

        if (video.muted) {
            video.muted = false;
            muteToggleButton.textContent = "Desativar Som";
        } else {
            video.muted = true;
            muteToggleButton.textContent = "Ativar Som";
        }
    });
});

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});
