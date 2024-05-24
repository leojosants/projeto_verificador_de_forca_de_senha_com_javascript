const htmlElements = {
    DOM_passwordInput: document.querySelector('[data-id="password-input"]'),
    DOM_strengthIndicator: document.querySelector('[data-id="strength-indicator"]'),
    DOM_strengthText: document.querySelector('[data-id="strength-text"]'),
    DOM_togglePassword: document.querySelector('[data-id-toggle-password]')
};

const events = {
    click: 'click',
    input: 'input'
};

const iconClasses = {
    eye: 'fa-eye',
    slash: 'fa-eye-slash'
};

const colors = {
    color_e70b0b: '#e70b0b',
    color_ffb74b: '#ffb74b',
    color_fff176: '#fff176',
    color_81c784: '#81c784'
};

const texts = {
    password: 'password',
    text: 'text',
};

htmlElements.DOM_togglePassword.addEventListener(events.click,
    (event) => {
        const eventTarget = event.target;
        const type = htmlElements.DOM_passwordInput.type.includes(texts.password) ? texts.text : texts.password;
        const passwordLength = htmlElements.DOM_passwordInput.value.length;

        htmlElements.DOM_passwordInput.type = type;

        if (passwordLength === 0) return

        eventTarget.classList.toggle(iconClasses.eye);
        eventTarget.classList.toggle(iconClasses.slash);
    }
);

htmlElements.DOM_passwordInput.addEventListener(events.input,
    (event) => {
        const eventTargetValue = event.target.value;
        const passwordValue = eventTargetValue;
        const passwordLength = eventTargetValue.length;
        const iconIncludesClassSlash = htmlElements.DOM_togglePassword.className.includes(iconClasses.slash);

        const strengths = {
            0: 'Muito fraca',
            1: 'Fraca',
            2: 'Moderada',
            3: 'Forte',
            4: 'Muito Forte'
        };

        let score = 0;

        // requisitos
        if (passwordLength >= 8) score++;
        if (passwordValue.match(/[a-z]/)) score++;
        if (passwordValue.match(/[A-Z]/)) score++;
        if (passwordValue.match(/[0-9]/)) score++;
        if (passwordValue.match(/[^a-zA-Z0-9]/)) score++;

        const width = (score / 4) * 100;

        if (score > 4) return;

        switch (score) {
            case 1:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = colors.color_e70b0b;
                break;

            case 2:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = colors.color_ffb74b;
                break;

            case 3:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = colors.color_fff176;
                break;

            case 4:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = colors.color_81c784;
                break;

            default:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = 'transparent';
                break;
        }

        htmlElements.DOM_strengthIndicator.style.width = `${width}%`;

        if (passwordLength > 0) {
            htmlElements.DOM_strengthText.innerHTML = `Força ${strengths[score]}`;
        }
        else {
            htmlElements.DOM_strengthText.innerHTML = 'Senha fraca';
        }

        if (passwordLength === 0 && iconIncludesClassSlash) {
            htmlElements.DOM_togglePassword.classList.remove(iconClasses.slash);
            htmlElements.DOM_togglePassword.classList.add(iconClasses.eye);
        }
    }
);