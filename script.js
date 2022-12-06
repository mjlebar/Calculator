"use strict";

const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".button"); //selects all buttons of the calculator

const buttonList = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "+",
  "C",
  "=",
  "-",
  "*",
  "÷",
  "/",
  "Enter",
];

let displayVal; //the value displayed on the calculator
let calcVal; //the latest calculation performed by the calculator - we need this so that we can store the first argument to a calculator operation while the second is being typed. Ie if we add 17 to 35, this stores 17 while we type 35
let operator; //the latest operator pressed on the calculator
let rightAfterCalc = false; //tracks if we've just completed a calculation - if we have, then entering a new number should clear the display before entering a number

buttons.forEach((button) => button.addEventListener("click", updateDisplay));
document.addEventListener("keydown", updateDisplay);
//we can input into the calculator either with the keys on the display or with the keyboard

function operate(operator, a, b) {
  let ans;
  rightAfterCalc = false; //we are not at the end of a calculation if we're performing an operation - we still need enter to be pressed
  if (operator === "+") ans = a + b;
  else if (operator === "-") ans = a - b;
  else if (operator === "*") ans = a * b;
  else if (operator === "÷" || operator === "/") {
    //If the operation is division, we want to make sure we are not dividing by zero

    if (b === 0) {
      return "ERROR!";
    } else {
      ans = a / b;
    }
  }
  if (ans.toString().length > 30) {
    const beforeDec = ans.toString().split(".")[0].length; //this sees how long the number is before the decimal point; the longer it is, the fewer decimals we want to see, since the pre-decimal point digits take up more space
    return ans.toFixed(26 - beforeDec);
  } //if we have a long result, ie a lot of decimals, we cut it down to show only a few points beyond the decimal
  return ans;
} //passed an operator and two numbers; returns the result of the operation on those numbers

function updateDisplay(e) {
  let btnContent; //contains the content of whatever button was pressed

  if (e.type === "click") {
    btnContent = e.target.textContent;
  } else if (e.type === "keydown" && buttonList.includes(e.key)) {
    btnContent = e.key; //eg if the user has pressed "9" or "*" on their keyboard, we treat it as if they had clicked the equivalent key on the calculator
  } else return; //if it's some other event, ie the user has pressed "q" on their keyboard, nothing should happen

  const enterers = ["=", "Enter"];
  const operators = ["+", "*", "-", "÷", "/"];
  //we separate our buttons into categories to articulate the possible cases in the following if-else statement

  //This executes the appropriate code based on what key has been pressed
  if (btnContent === "C") {
    //if C is pressed, clears the calculator
    display.textContent = "";
    operator = null;
    calcVal = null;
    displayVal = null;
  } else if (enterers.includes(btnContent)) {
    if (!operator) return; //if no operation has been performed, enter should not do anything

    //if we've performed an operation and pressed enter, we should see the results of that operation
    displayVal = operate(operator, calcVal, displayVal);
    display.textContent = `${displayVal}`;

    //clear the operator and the last calculated value
    operator = null;
    calcVal = null;
    rightAfterCalc = true;
  } else if (operators.includes(btnContent)) {
    if (operator && displayVal) {
      //if we have an operator, and a second argument has been entered (this is what displayVal checks for), we are chaining operations, and we need the result from the stored operation before performing the new one

      //calculate and display the stored operation
      displayVal = operate(operator, calcVal, displayVal);
      display.textContent = `${displayVal}`;

      //store the new operator, and record the displayValue as calcVal
      operator = btnContent;
      calcVal = displayVal;
    } else if (!operator) {
      //if an operator has not already been passed, store the operator and argument already passed, and clear the display so the second argument can be entered
      calcVal = displayVal;
      operator = btnContent;
      displayVal = null;
    } else {
      //the only other possibility is that an operator has been passed but no second argument has been entered, in which case all we want to do is update the operator
      operator = btnContent;
    }
  } else if (btnContent === ".") {
    if (!display.textContent.includes(".")) {
      //if there's no decimal already present, we check to see if anything has been entered yet. If not, we treat it as if there was a 0 entered first. Otherwise just add the decimal
      if (!displayVal) {
        displayVal = 0;
        display.textContent = `0.`;
      } else display.textContent += ".";
    } //if there's already a decimal, we don't want pressing the button to do anything
  } else if (rightAfterCalc || operator) {
    //if we've just completed a calculation, or if we've just chosen an operation, we want our next input to simply be the number entered
    displayVal = Number(btnContent);
    display.textContent = displayVal;
    rightAfterCalc = false;
  } else {
    //otherwise, we're just adding digits to an already existing number
    display.textContent += btnContent;
    displayVal = Number(display.textContent);
  }
}
