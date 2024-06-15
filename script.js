document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));

    let currentInput = '';
    let previousInput = '';
    let operation = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operation = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (currentInput !== '' && previousInput !== '' && operation !== '') {
                    currentInput = eval(`${previousInput}${operation}${currentInput}`);
                    display.textContent = currentInput;
                    previousInput = '';
                    operation = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operation = value;
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
});
