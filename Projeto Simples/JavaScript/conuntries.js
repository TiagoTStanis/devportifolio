document.addEventListener('DOMContentLoaded', function () {
    const dddSelect = document.getElementById('custom-ddd-select');
    const dddList = document.getElementById('ddd-list');
    const selectedDdd = document.getElementById('selected-ddd');
    const inputTelefone = document.getElementById('telefone');

    let selectedCountryCode = '';
    let countryIsoCode = '';

    async function fetchCountryCodes() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();

            const countryCodes = countries.map(country => {
                if (country.idd.root && country.idd.suffixes) {
                    return {
                        code: `${country.idd.root}${country.idd.suffixes[0]}`,
                        flag: country.flags.svg,
                        iso: country.cca2
                    };
                }
                return null;
            }).filter(item => item !== null);

            countryCodes.sort((a, b) => parseInt(a.code.replace('+', '')) - parseInt(b.code.replace('+', '')));

            populateCustomDDDs(countryCodes);
        } catch (error) {
            console.error('Erro ao buscar os DDDs:', error);
        }
    }

    function populateCustomDDDs(countries) {
        countries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${country.flag}" alt="flag" style="width: 20px; vertical-align: middle; margin-right: 10px;">
                ${country.code}
            `;
            dddList.appendChild(listItem);

            listItem.addEventListener('click', function (event) {
                event.stopPropagation();
                selectedDdd.innerHTML = listItem.innerHTML;
                selectedCountryCode = country.code;
                countryIsoCode = country.iso;
                inputTelefone.value = `${selectedCountryCode} `;
                dddList.style.display = 'none';
                inputTelefone.focus();
                inputTelefone.setSelectionRange(inputTelefone.value.length, inputTelefone.value.length);
            });
        });
    }

    dddSelect.addEventListener('click', function (event) {
        event.stopPropagation();
        dddList.style.display = (dddList.style.display === 'none' || dddList.style.display === '') ? 'block' : 'none';
    });

    document.addEventListener('click', function (event) {
        if (!dddSelect.contains(event.target)) {
            dddList.style.display = 'none';
        }
    });

    inputTelefone.addEventListener('input', function () {
        const inputValue = inputTelefone.value.replace(selectedCountryCode, '').trim();
        const onlyNumbers = inputValue.replace(/\D/g, '');

        try {
            const phoneNumber = libphonenumber.parsePhoneNumberFromString(onlyNumbers, countryIsoCode);

            if (phoneNumber && phoneNumber.isValid()) {
                inputTelefone.value = phoneNumber.formatInternational();
                inputTelefone.style.border = '2px solid #00ff00';

                verificaSSO(inputTelefone.value);

            } else {
                inputTelefone.value = `${selectedCountryCode} ${onlyNumbers}`;
                inputTelefone.style.border = '2px solid red';
            }
        } catch (error) {
            console.error('Erro ao validar o número de telefone:', error);
            inputTelefone.style.border = '2px solid red';
        }
    });

    inputTelefone.addEventListener('keydown', function (event) {
        const cursorPosition = inputTelefone.selectionStart;
        if (cursorPosition <= selectedCountryCode.length && (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) {
            event.preventDefault();
        }
    });

    fetchCountryCodes();
    
});
