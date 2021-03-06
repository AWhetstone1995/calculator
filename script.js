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
    if(currentOperation === "SQRT" || currentOperation === "X^2") evaluate();
    resetScreen = true;
}

function evaluate() {
    if (currentOperation === null) return;
    if (currentOperation === "SQRT" || currentOperation === "X^2") {
        currentScreen.textContent = operate(currentOperation, firstOperand, secondOperand);
        resetScreen = true;
        currentOperation = null;
        return;
    }
    secondOperand = currentScreen.textContent;
    currentScreen.textContent = operate(currentOperation, firstOperand, secondOperand);
    resetScreen = true;
    currentOperation = null;
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <=9 || e.key === '.') appendNumberToScreen(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '/' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '^' || e.key === 'q') 
        setOperator(convertOperator(e.key));
}

function convertOperator(operator) {
    if (operator === '/') return '/';
    if (operator === '+') return '+';
    if (operator === '-') return '-';
    if (operator === '*') return 'x';
    if (operator === '^') return 'X^';
    if (operator === 'q') return 'SQRT';
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    result = 0;
    switch (operator) {
        case '/':
            if (b === 0) return null
            else result = divide(a,b)
            break;
        case 'x':
            result = multiply(a,b);
            break;
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case 'X^':
            result = power(a,b);
            break;
        case 'SQRT':
            result = squareRoot(a);
            break;
        case 'X^2':
            result = squareNumber(a);
            break;
        case 'MOD':
            result = modulo(a,b);
            break;
        default:
            result = null;
    }
    if (result == null) {
        return result
    } else {
        result = parseFloat(result.toFixed(12));
        console.log(result)
        return result
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

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function squareRoot(number) {
    return Math.sqrt(number);
}

function squareNumber(number) {
    return number * number;
}

function modulo(num1, num2) {
    return num1 % num2;
}