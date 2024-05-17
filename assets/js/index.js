const htmlElements = {
    DOM_passwordInput: document.querySelector('[data-id="password-input"]'),
    DOM_strengthIndicator: document.querySelector('[data-id="strength-indicator"]'),
    DOM_strengthText: document.querySelector('[data-id="strength-text"]')
};

htmlElements.DOM_passwordInput.addEventListener('input',
    (event) => {
        const eventTargetValue = event.target.value;
        const password = eventTargetValue;

        const strengths = {
            0: 'Muito fraca',
            1: 'Fraca',
            2: 'Moderada',
            3: 'Forte',
            4: 'Muito Forte'
        };

        let score = 0;

        // requisitos
        if (password.length >= 8) score++;
        if (password.match(/[a-z]/)) score++;
        if (password.match(/[A-Z]/)) score++;
        if (password.match(/[0-9]/)) score++;
        if (password.match(/[^a-zA-Z0-9]/)) score++;

        const width = (score / 4) * 100;

        if (score > 4) return;

        switch (score) {
            case 1:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = '#e70b0b';
                break;

            case 2:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = '#ffb74b';
                break;

            case 3:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = '#fff176';
                break;

            case 4:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = '#81c784';
                break;

            default:
                htmlElements.DOM_strengthIndicator.style.backgroundColor = 'transparent';
                break;
        }

        htmlElements.DOM_strengthIndicator.style.width = `${width}%`;

        if (password.length > 0) {
            htmlElements.DOM_strengthText.innerHTML = `Força ${strengths[score]}`;
            console.log(score)
        }
        else {
            htmlElements.DOM_strengthText.innerHTML = 'Senha fraca';
        }
    }
);