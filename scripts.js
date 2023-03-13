const currentOperation = document.querySelector('#current-operation');
const previousOperation = document.querySelector('#previous-operation');

let num1;
let num2;
let end = false;

function insert(value) {

    if (end) {
        if (!isNaN(value)) {
            currentOperation.innerText = ''
            end = false
        }
    }
    // Checa se o valor atual ja tem um ponto
    if (value === '.' && currentOperation.innerText.includes(".")) {
        return
    }

    if (value === '/' || value === '*' || value === '-' || value === '+') {

        if (currentOperation.innerText === '') {
            return
        }

        if (!previousOperation.innerText || end) {
            previousOperation.innerText = `${currentOperation.innerText} ${value}`
            currentOperation.innerText = '0';
            end = false
            return
        }

        if (!currentOperation.innerText) {
            previousOperation.innerText = `${previousOperation.innerText.substr(0, previousOperation.innerText.length - 2)} ${value}`
            return
        }

        if (previousOperation.innerText && currentOperation.innerText) {

            let num1 = previousOperation.innerText.substr(0, previousOperation.innerText.length - 2);
            let num2 = currentOperation.innerText;

            calc(num1, num2, value);

            previousOperation.innerText = `${currentOperation.innerText} ${value}`;
            currentOperation.innerText = '0';
            return
        }
    }

    if (value === '.') {
        currentOperation.innerText += '.'; // O '0' inicial permanece e é adicionado um ponto
    } else if (currentOperation.innerText === '0') { // Exclui o 0 inicial e adiciona o value digitado direto
        currentOperation.innerText = value;
    } else {
        currentOperation.innerText += value;
    }
}

function calc(num1, num2, operation) {

    switch (operation) {
        case "+":
            currentOperation.innerText = parseFloat(num1) + parseFloat(num2);
            break
        case "-":
            currentOperation.innerText = parseFloat(num1) - parseFloat(num2);
            break
        case "*":
            currentOperation.innerText = parseFloat(num1) * parseFloat(num2);
            break
        case "/":
            currentOperation.innerText = parseFloat(num1) / parseFloat(num2);
            break
    }
}

function submit() {
    
    let operation = previousOperation.innerText.slice(-1);

    calc(previousOperation.innerText, currentOperation.innerText, operation);
    previousOperation.innerText = ''
    end = true

}

function clearAll() {
    currentOperation.innerText = '0';
    previousOperation.innerText = '';
}

function backspace() {

    if (currentOperation.textContent) {
        let valueText = document.getElementById('current-operation').innerText;
        valueText = valueText.substring(0, valueText.length - 1);
        if (valueText.length > 0) {
            currentOperation.innerText = valueText;
        } else {
            currentOperation.innerText = '0';
        }
    }
}
