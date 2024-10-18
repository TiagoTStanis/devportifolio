document.addEventListener('DOMContentLoaded', function () {
    const nomeInput = document.getElementById('nome');

    nomeInput.addEventListener('input', function () {
        const nomeValido = validaNome(nomeInput.value);

        if (!nomeValido) {
            nomeInput.style.border = '2px solid red';
        } else {
            nomeInput.style.border = '2px solid #00ff00';
        }
    });

    function validaNome(nome) {
        const nomePattern = /^[\p{L}\p{M}\s'-]+$/u;
        return nomePattern.test(nome.trim());
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('input', function () {
        const emailValido = validaEmail(emailInput.value);

        if (!emailValido) {
            emailInput.style.border = '2px solid red';
        } else {
            emailInput.style.border = '2px solid #00ff00';
        }
    });

    function validaEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    }
});
