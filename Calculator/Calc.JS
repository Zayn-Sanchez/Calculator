// Initialise variables
let firstInput = '';
let operator = '';
let secondInput = '';
let result = '';
let isOperatorChosen = false;
let isCalculated = false;

// Grab elements from the DOM
const buttons = Array.from(document.getElementsByTagName('button'));
const display = document.getElementById('display');

// Function to calculate result
function calculate() {
    // Convert inputs to numbers
    firstInput = parseFloat(firstInput);
    secondInput = parseFloat(secondInput);

    // Perform calculation based on operator
    switch (operator) {
        case "+":
            result = firstInput + secondInput;
            break;
        case "-":
            result = firstInput - secondInput;
            break;
        case "×":
            result = firstInput * secondInput;
            break;
        case "÷":
            if(secondInput != 0) {
                result = firstInput / secondInput;
            } else {
                alert("Division by 0 is not allowed"); 
                resetCalculator();
                display.value = '';
            }
            break;
    }

    // Update display with result
    display.value = result;
    
    // Update firstInput with the result for further calculations
    firstInput = result;
    secondInput = '';
    isOperatorChosen = false;
}

// Function to reset calculator
function resetCalculator() {
    firstInput = '';
    operator = '';
    secondInput = '';
    result = '';
    isOperatorChosen = false;
    isCalculated = false;
}

// Function to handle number input
function handleNumberInput(buttonValue) {
    // Append to first or second input depending on whether an operator is chosen
    if (isOperatorChosen) {
        secondInput += buttonValue;
        display.value = secondInput;
    } else {
        firstInput += buttonValue;
        display.value = firstInput;
    }
}

// Function to handle operator input
function handleOperatorInput(buttonValue) {
    // If operator is already chosen, perform calculation
    if(isOperatorChosen) {
        calculate();
    }
    
    operator = buttonValue;
    isOperatorChosen = true;
}

// Attach event listeners to buttons
buttons.map(button => {
    button.addEventListener('click', (e) => {
        const buttonValue = e.target.innerText;

        // Reset calculator if a calculation is done and new number is entered
        if (isCalculated && !isNaN(buttonValue)) {
            resetCalculator();
        }

        // Handle operator buttons
        if (buttonValue === '+' || buttonValue === '-' || buttonValue === '×' || buttonValue === '÷') {
            handleOperatorInput(buttonValue);
        } else if (buttonValue === 'C') { // Handle clear button
            resetCalculator();
            display.value = '';
        } else if (buttonValue === '=') { // Handle equals button
            if (firstInput && isOperatorChosen && !secondInput) { // Check if inputs are ready for calculation
                alert('Please enter a number to calculate');
            } else {
                calculate();
                isCalculated = true;
            }
        } else { // Handle number buttons
            handleNumberInput(buttonValue);
        }
    });
});


