import "../CSS/style.css";

const display = document.querySelector(".value");
const buttons = document.querySelectorAll("button");

// Attach click event listener to all buttons
buttons.forEach((button) => {
  button.onclick = () => handleButtonClick(button.dataset.button);
});

// Function to handle button clicks
function handleButtonClick(input) {
  try {
    switch (input) {
      case "C": // Clear display
        clearDisplay();
        break;

      case "CE": // Remove last character
        backspace();
        break;

      case "=": // Evaluate expression
        evaluateExpression();
        break;

      default: // Append button value
        appendToDisplay(input);
        break;
    }
  } catch (err) {
    showError();
  }
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Remove the last character
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the expression safely
function evaluateExpression() {
  if (isValidExpression(display.value)) {
    display.value = eval(display.value);
  } else {
    throw new Error("Invalid Expression");
  }
}

// Append input to the display
function appendToDisplay(input) {
  display.value += input;
}

// Validate the expression before evaluation
function isValidExpression(expression) {
  // Ensure the expression starts and ends correctly
  return (
    /^[\d+\-*/().]+$/.test(expression) && !/[\+\-\*\/]{2,}/.test(expression)
  );
}

// Show error message
function showError() {
  display.value = "Invalid Entry";
  setTimeout(clearDisplay, 1000); // Clear after 1 second
}
