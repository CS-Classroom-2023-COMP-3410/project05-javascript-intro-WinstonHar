/************************************************
 * 1. Select DOM elements
 ************************************************/
const display        = document.getElementById("display");

// Number buttons, operator buttons, equals
const numberButtons  = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalsButton   = document.getElementById("equalsBtn");

// Function buttons
const clearButton    = document.getElementById("clearBtn");
const sqrtButton     = document.getElementById("sqrtBtn");
const percentButton  = document.getElementById("percentBtn");

// Memory buttons
const mcButton       = document.getElementById("mcBtn");
const mrButton       = document.getElementById("mrBtn");
const mPlusButton    = document.getElementById("mPlusBtn");
const mMinusButton   = document.getElementById("mMinusBtn");

/************************************************
 * 2. Calculator State
 ************************************************/
let currentInput     = "0";
let previousInput    = null;
let currentOperator  = null;
let memoryStore      = 0; // Memory register

/************************************************
 * 3. Update Display
 ************************************************/
function updateDisplay(value) {
  display.textContent = value;
}

/************************************************
 * 4. Handle Number Input
 ************************************************/
numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.getAttribute("data-number");

    // If currentInput is "0" or we just performed an operation, replace it
    if (currentInput === "0" || (previousInput !== null && !currentOperator && currentInput !== "0.")) {
      currentInput = number;
    } else {
      // Otherwise, append
      // Prevent multiple decimals
      if (number === "." && currentInput.includes(".")) return;
      currentInput += number;
    }

    updateDisplay(currentInput);
  });
});

/************************************************
 * 5. Handle Operators
 ************************************************/
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const operator = btn.getAttribute("data-operator");

    // If there's a pending operation, compute it first
    if (previousInput !== null && currentOperator) {
      computeResult();
    } else {
      // Move currentInput to previousInput
      previousInput = currentInput;
    }

    currentOperator = operator;
    currentInput = "0"; // Reset current for next entry
  });
});

/************************************************
 * 6. Compute Result
 ************************************************/
equalsButton.addEventListener("click", () => {
  if (previousInput === null || !currentOperator) return;
  computeResult();
});

// Helper function
function computeResult() {
  let result = 0;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (currentOperator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      // handle division by zero
      if (curr === 0) {
        updateDisplay("Error");
        resetCalculator();
        return;
      } else {
        result = prev / curr;
      }
      break;
    default:
      return;
  }

  currentInput = String(result);
  previousInput = null;
  currentOperator = null;
  updateDisplay(currentInput);
}

/************************************************
 * 7. Clear / Reset
 ************************************************/
clearButton.addEventListener("click", () => {
  resetCalculator();
  updateDisplay(currentInput);
});

function resetCalculator() {
  currentInput = "0";
  previousInput = null;
  currentOperator = null;
}

/************************************************
 * 8. Advanced Functions (√, %)
 ************************************************/
sqrtButton.addEventListener("click", () => {
  const value = parseFloat(currentInput);
  if (value < 0) {
    updateDisplay("Error");
    resetCalculator();
    return;
  }

  const result = Math.sqrt(value);
  currentInput = String(result);
  updateDisplay(currentInput);
});

percentButton.addEventListener("click", () => {
  // Convert current input to fraction of 100
  const value = parseFloat(currentInput);
  const result = value / 100;
  currentInput = String(result);
  updateDisplay(currentInput);
});

/************************************************
 * 9. Memory Functions
 ************************************************/
mcButton.addEventListener("click", () => {
  memoryStore = 0;
});

mrButton.addEventListener("click", () => {
  // Recall memory
  currentInput = String(memoryStore);
  updateDisplay(currentInput);
});

mPlusButton.addEventListener("click", () => {
  memoryStore += parseFloat(currentInput);
});

mMinusButton.addEventListener("click", () => {
  memoryStore -= parseFloat(currentInput);
});
