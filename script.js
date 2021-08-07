let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let resetScreen = false;

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const operateButton = document.querySelector('.operate-button');
const currentScreen = document.querySelector('.screen-current');

window.addEventListener('keydown', keyboardInput);

currentScreen.textContent = '0';

numberButtons.forEach((button => 
    button.addEventListener('click', () => appendNumberToScreen(button.textContent)))
);

operatorButtons.forEach((button => 
    button.addEventListener('click', () => setOperator(button.textContent)))
);

clearButton.addEventListener('click', () => clearScreen());
deleteButton.addEventListener('click', deleteNumber);

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.slice(0,-1)
    if(currentScreen.textContent == ''){
        currentScreen.textContent = '0';
    }
}

operateButton.addEventListener('click', evaluate);

function appendNumberToScreen(number) {
    if(resetScreen || currentScreen.textContent == '0') {
        currentScreen.textContent = '';
        resetScreen = false;
    }
    currentScreen.textContent += number;
}

function clearScreen() {
    currentScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    resetScreen = false;
}

function setOperator(operator) {
    if(currentOperation !== null) {
        evaluate();
    };
    firstOperand = currentScreen.textContent;
    currentOperation = operator;
    resetScreen = true;
}

function evaluate() {
    if (currentOperation === null) return;
    secondOperand = currentScreen.textContent;
    currentScreen.textContent = operate(currentOperation, firstOperand, secondOperand);
    resetScreen = true;
    currentOperation = null;
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <=9) appendNumberToScreen(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '/' || e.key === '+' || e.key === '-' || e.key === '*') 
        setOperator(convertOperator(e.key));
}

function convertOperator(operator) {
    if (operator === '/') return '/';
    if (operator === '+') return '+';
    if (operator === '-') return '-';
    if (operator === '*') return 'x';
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '/':
            if (b === 0) return null
            else return divide(a,b)
        case 'x':
            return multiply(a,b);
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        default:
            return null;
    }
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

