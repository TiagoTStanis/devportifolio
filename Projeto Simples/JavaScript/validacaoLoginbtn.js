function setRequiredFields(isLogin) {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    emailInput.required = true;

    if (isLogin) {
        senhaInput.required = true;
    } else {
        senhaInput.required = false;
        //document.getElementById('loginForm').submit();
    }
}

document.getElementById('login').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    if (!emailInput.validity.valid || !senhaInput.validity.valid) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});