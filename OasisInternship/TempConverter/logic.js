document.addEventListener('DOMContentLoaded', () => {
    const form1 = document.getElementById('form1');
    const convertBackButton = document.getElementById('to-sub');
    const fromSelect = document.getElementById('from-select');
    const toSelect = document.getElementById('to-select');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');

    form1.addEventListener('submit', (event) => {
        event.preventDefault(); 
        convertTemperature();
    });

    form2.addEventListener('submit', (event) => {
        event.preventDefault(); 
        convertTemperature();
    });
    
    function convertTemperature() {
        const from = fromSelect.value;
        const to = toSelect.value;
        const input = parseFloat(inputText.value);

        if (isNaN(input)) {
            outputText.value = "Invalid input";
            return;
        }

        let result;

        if (from === "Celcius") {
            if (to === "Fahrenheit") {
                result = (input * 9/5) + 32;
            } 
            else if (to === "Kelvin") {
                result = input + 273.15;
            }
            else {
                result = input;
            }
        }
        else if (from === "Fahrenheit") {
            if (to === "Celcius") {
                result = (input - 32) * 5/9;
            } 
            else if (to === "Kelvin") {
                result = (input - 32) * 5/9 + 273.15;
            }
            else {
                result = input;
            }
        }
        else if (from === "Kelvin") {
            if (to === "Celcius") {
                result = input - 273.15;
            } 
            else if (to === "Fahrenheit") {
                result = (input - 273.15) * 9/5 + 32;
            }
            else {
                result = input;
            }
        }

        outputText.value = result ? result.toFixed(2) : "Conversion not supported";
    }

    convertBackButton.addEventListener('click', () => {
        const from = toSelect.value;
        const to = fromSelect.value;
        const input = parseFloat(outputText.value);

        if (isNaN(input)) {
            inputText.value = "Invalid input";
            return;
        }

        let result;

        if (from === "Celcius") {
            if (to === "Fahrenheit") {
                result = (input * 9/5) + 32;
            } 
            else if (to === "Kelvin") {
                result = input + 273.15;
            }
            else {
                result = input;
            }
        }
        else if (from === "Fahrenheit") {
            if (to === "Celcius") {
                result = (input - 32) * 5/9;
            } 
            else if (to === "Kelvin") {
                result = (input - 32) * 5/9 + 273.15;
            }
            else {
                result = input;
            }
        }
        else if (from === "Kelvin") {
            if (to === "Celcius") {
                result = input - 273.15;
            } 
            else if (to === "Fahrenheit") {
                result = (input - 273.15) * 9/5 + 32;
            }
            else {
                result = input;
            }
        }

        inputText.value = result ? result.toFixed(2) : "Conversion not supported";
    });      
});
