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

document.addEventListener("DOMContentLoaded", function () {
    const experiencias = document.querySelectorAll(".experience-item");
    const linhaDoTempoContainer = document.getElementById("linhaDoTempo");

    experiencias.forEach((experiencia, index) => {
        const tituloEmpresa = experiencia.querySelector("h3").textContent;
        const cargoTexto = experiencia.querySelector("p strong").textContent;
        const periodoTexto = experiencia.querySelector("p").textContent.match(/\| (.+)$/)[1].trim();

        const [mesInicio, anoInicio, mesFim, anoFim] = periodoTexto
            .replace(/\(|\)/g, "")
            .split(" - ")
            .flatMap(date => date.split(" de "));

        const meses = {
            "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4, "Maio": 5, "Junho": 6,
            "Julho": 7, "Agosto": 8, "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
        };
        
        const dataInicio = new Date(anoInicio, meses[mesInicio]);
        const dataFim = new Date(anoFim, meses[mesFim] + 1); /*lógica para contar o mes inteiro*/

        let anos = dataFim.getFullYear() - dataInicio.getFullYear();
        let mesesDiferenca = dataFim.getMonth() - dataInicio.getMonth();

        if (mesesDiferenca < 0) {
            anos--;
            mesesDiferenca += 12;
        }

        const diasInicio = dataInicio.getDate();
        const diasFim = dataFim.getDate();
        if (diasFim < diasInicio) {
            mesesDiferenca += 1;
            if (mesesDiferenca === 12) {
                anos += 1;
                mesesDiferenca = 0;
            }
        }

        const duracao = `${anos > 0 ? `${anos} ano(s) ` : ""}${mesesDiferenca > 0 ? `${mesesDiferenca} mês(es)` : ""}`;

        const eventoDiv = document.createElement("div");
        eventoDiv.classList.add("item-linha-do-tempo");

        const titulo = document.createElement("h3");
        titulo.textContent = `${tituloEmpresa} - ${cargoTexto}`;

        const duracaoTexto = document.createElement("span");
        duracaoTexto.classList.add("periodo-linha-do-tempo");
        duracaoTexto.textContent = duracao;

        titulo.appendChild(duracaoTexto);
        eventoDiv.appendChild(titulo);
        
        eventoDiv.addEventListener("click", () => {
            experiencia.scrollIntoView({ behavior: "smooth" });
        });

        linhaDoTempoContainer.appendChild(eventoDiv);
    });
});
