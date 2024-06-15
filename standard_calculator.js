document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button;
        btn.addEventListener('click', () => handleButtonClick(button));
        buttonsContainer.appendChild(btn);
    });

    let currentInput = '';

    function handleButtonClick(value) {
        if (value === 'C') {
            currentInput = '';
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(currentInput);
                currentInput = display.value;
            } catch {
                display.value = 'Error';
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    }

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', '*', '-', '+', 'Enter', 'Backspace', 'Escape'].includes(key)) {
            event.preventDefault();
            if (key === 'Enter') {
                handleButtonClick('=');
            } else if (key === 'Backspace') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (key === 'Escape') {
                handleButtonClick('C');
            } else {
                handleButtonClick(key);
            }
        }
    });
});
