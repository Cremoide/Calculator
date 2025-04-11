// Functions for all of the basic math operators:
// add, subtract, multiply, divide.
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Can't divide by 0";
    }
    return a / b;
}

// Variables for the operation parameters. (And display updating).
let numberOne = 0;
let numberTwo = 0;
let operator = "";
let justEvaluated = false;

// Function that takes two numbers and call one of the above operator functions.
function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

// Functions to update and store the display numbers.
const input = document.getElementById("number");
let currentDisplay = "";

const buttons = document.querySelectorAll(".btn");

// Calculator logic.
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        console.log(`${value} was pressed.`);

        // Numbers and decimals
        if (!isNaN(value) || value === ".") {
            if (justEvaluated) {
                currentDisplay = "";
                input.value = "";
                justEvaluated = false;
            }
            currentDisplay += value;
            input.value = currentDisplay;
        }

        // AC button
        if (value === "AC") {
            input.value = "";
            currentDisplay = "";
            numberOne = 0;
            numberTwo = 0;
            operator = "";
            justEvaluated = false;
            console.log(`Values cleared: a:${numberOne} b:${numberTwo}`);
        }

        // Operator buttons
        if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (currentDisplay === "") {
                operator = value;
                return;
            }

            if (numberOne === 0 || justEvaluated) {
                numberOne = parseFloat(currentDisplay);
            } else {
                numberTwo = parseFloat(currentDisplay);
                const result = operate(operator, numberOne, numberTwo);
                numberOne = result;
                input.value = (result % 1 === 0) ? result : parseFloat(result.toFixed(3));
            }

            operator = value;
            currentDisplay = "";
            justEvaluated = false;
        }

        // Equal button
        if (value === "=") {
            if (operator && currentDisplay !== "") {
                numberTwo = parseFloat(currentDisplay);
                const result = operate(operator, numberOne, numberTwo);
                input.value = (result === "Error: Can't divide by 0" ? result : parseFloat(result.toFixed(3))); // Round to 2 decimals
                numberOne = result;
                justEvaluated = true;
                console.log(`Operation result: ${result}`);
            }
        }

        // EXTRAS

        // . button disables if there’s already a decimal separator in the display.
        const floatBtn = document.getElementById("float");
        if (input.value.includes(".")) {
            floatBtn.disabled = true;
        } else {
            floatBtn.disabled = false;
        }

        // “Backspace” button for undo last input.
        if (value === "←") {
            currentDisplay = currentDisplay.slice(0, -1);
            input.value = currentDisplay;
            justEvaluated = false;
        }
    });
});