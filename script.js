let firstOperand = '';
let secondOperand = '';


const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const currentScreen = document.querySelector('.screen-current');

currentScreen.textContent = '0';

numberButtons.forEach((button => 
    button.addEventListener('click', () => appendNumberToScreen(button.textContent)))
);

operatorButtons.forEach((button => 
    button.addEventListener('click', () => appendNumberToScreen(button.textContent)))
);

clearButton.addEventListener('click', () => clearScreen());
deleteButton.addEventListener('click', () => {
    currentScreen.textContent = currentScreen.textContent.slice(0,-1)
    if(currentScreen.textContent == ''){
        currentScreen.textContent = '0';
    }
});

function appendNumberToScreen(number) {
    if(currentScreen.textContent == '0') currentScreen.textContent = '';
    currentScreen.textContent += number;
}

function operate() {
    
}

function clearScreen() {
    currentScreen.textContent = '0';
}

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

