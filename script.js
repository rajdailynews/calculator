document.addEventListener('DOMContentLoaded', () => {
    // Standard Calculator
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

    // Handle keyboard input
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

    // Unit Converters
    const unitType = document.getElementById('unit-type');
    const converterFields = document.getElementById('converter-fields');

    const unitConversions = {
        length: {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100,
            millimeter: 1000,
            mile: 0.000621371,
            yard: 1.09361,
            foot: 3.28084,
            inch: 39.3701
        },
        weight: {
            kilogram: 1,
            gram: 1000,
            milligram: 1000000,
            pound: 2.20462,
            ounce: 35.274
        },
        volume: {
            liter: 1,
            milliliter: 1000,
            cubic_meter: 0.001,
            cubic_centimeter: 1000,
            cubic_inch: 61.0237,
            cubic_foot: 0.0353147,
            gallon: 0.264172,
            quart: 1.05669,
            pint: 2.11338,
            cup: 4.22675
        },
        temperature: {
            celsius: 'celsius',
            fahrenheit: 'fahrenheit',
            kelvin: 'kelvin'
        }
    };

    unitType.addEventListener('change', () => {
        createConverterFields(unitType.value);
    });

    function createConverterFields(type) {
        converterFields.innerHTML = '';
        const units = Object.keys(unitConversions[type]);

        const fromSelect = createSelect(units);
        const toSelect = createSelect(units);

        const fromInput = createInput('from-value');
        const toInput = createInput('to-value');

        fromInput.addEventListener('input', () => {
            convertUnits(type, fromInput.value, fromSelect.value, toSelect.value, toInput);
        });

        fromSelect.addEventListener('change', () => {
            convertUnits(type, fromInput.value, fromSelect.value, toSelect.value, toInput);
        });

        toSelect.addEventListener('change', () => {
            convertUnits(type, fromInput.value, fromSelect.value, toSelect.value, toInput);
        });

        converterFields.appendChild(fromInput);
        converterFields.appendChild(fromSelect);
        converterFields.appendChild(toInput);
        converterFields.appendChild(toSelect);
    }

    function createSelect(options) {
        const select = document.createElement('select');
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });
        return select;
    }

    function createInput(id) {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = id;
        return input;
    }

    function convertUnits(type, value, fromUnit, toUnit, outputField) {
        if (type === 'temperature') {
            outputField.value = convertTemperature(parseFloat(value), fromUnit, toUnit);
        } else {
            const fromFactor = unitConversions[type][fromUnit];
            const toFactor = unitConversions[type][toUnit];
            outputField.value = (parseFloat(value) * fromFactor / toFactor).toFixed(2);
        }
    }

    function convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        let tempInCelsius;
        if (fromUnit === 'celsius') tempInCelsius = value;
        else if (fromUnit === 'fahrenheit') tempInCelsius = (value - 32) * (5 / 9);
        else if (fromUnit === 'kelvin') tempInCelsius = value - 273.15;

        if (toUnit === 'celsius') return tempInCelsius;
        else if (toUnit === 'fahrenheit') return (tempInCelsius * 9 / 5) + 32;
        else if (toUnit === 'kelvin') return tempInCelsius + 273.15;
    }

    createConverterFields(unitType.value); // Initialize with default unit type
});
