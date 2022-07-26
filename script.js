"use strict";

const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".button");

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
  return a / b;
}

function operate(operator, a, b) {
  let ans;
  rightAfterChain = false;
  if (operator === "+") ans = a + b;
  else if (operator === "-") ans = a - b;
  else if (operator === "*") ans = a * b;
  else if (operator === "÷" || operator === "/") {
    if (b === 0) {
      return "ERROR!";
    } else {
      ans = a / b;
    }
  }
  if (ans.toString().length > 30) {
    beforeDec = ans.toString().split(".")[0].length;
    return ans.toFixed(26 - beforeDec);
  }
  return ans;
}

let displayVal;
let calcVal;
let operator;
let rightAfterChain = false;

buttons.forEach((button) => button.addEventListener("click", updateDisplay));
document.addEventListener("keydown", updateDisplay);

function updateDisplay(e) {
  let btn;
  if (e.type === "click") {
    btn = e.target.textContent;
  } else if (e.type === "keydown" && buttonList.includes(e.key)) {
    btn = e.key;
  } else return;
  if (btn === "C") {
    display.textContent = "";
    operator = null;
    calcVal = null;
    displayVal = null;
  } else if (
    (btn === "=" || btn === "Enter") &&
    operator &&
    Number.isFinite(calcVal) &&
    Number.isFinite(displayVal)
  ) {
    displayVal = operate(operator, calcVal, displayVal);
    display.textContent = `${displayVal}`;
    operator = null;
    calcVal = null;
  } else if (btn != "=" && btn != "Enter") {
    if (
      btn === "+" ||
      btn === "*" ||
      btn === "-" ||
      btn === "÷" ||
      btn === "/"
    ) {
      if (operator) {
        displayVal = operate(operator, calcVal, displayVal);
        display.textContent = `${displayVal}`;
        operator = btn;
        calcVal = displayVal;
      } else {
        calcVal = displayVal;
        operator = btn;
        displayVal = null;
      }
    } else {
      if (btn === ".") {
        if (!display.textContent.includes(".")) {
          if (!displayVal) {
            displayVal = 0;
            display.textContent = `0.`;
          } else display.textContent += ".";
        }
      } else if (operator && !rightAfterChain) {
        displayVal = Number(btn);
        display.textContent = displayVal;
        rightAfterChain = true;
      } else {
        display.textContent += btn;
        displayVal = Number(display.textContent);
      }
    }
  }
}
