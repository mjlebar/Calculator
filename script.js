"use strict";

const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".button");

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
  flag = false;
  if (operator === "+") ans = a + b;
  else if (operator === "-") ans = a - b;
  else if (operator === "*") ans = a * b;
  else if (operator === "÷") {
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
let flag = false;

buttons.forEach((button) => button.addEventListener("click", updateDisplay));

function updateDisplay(e) {
  const btn = e.target.textContent;
  if (btn === "C") {
    display.textContent = "";
    operator = null;
    calcVal = null;
    displayVal = null;
  } else if (
    btn === "=" &&
    operator &&
    Number.isFinite(calcVal) &&
    Number.isFinite(displayVal)
  ) {
    displayVal = operate(operator, calcVal, displayVal);
    display.textContent = `${displayVal}`;
    operator = null;
    calcVal = null;
  } else if (btn != "=") {
    if (btn === "+" || btn === "*" || btn === "-" || btn === "÷") {
      if (operator) {
        displayVal = operate(operator, calcVal, displayVal);
        display.textContent = `${displayVal}`;
        operator = btn;
        calcVal = displayVal;
      } else {
        calcVal = displayVal;
        operator = btn;
        displayVal = null;
        display.textContent = "";
      }
    } else {
      if (operator && !flag) {
        displayVal = Number(btn);
        display.textContent = displayVal;
        flag = true;
      } else {
        display.textContent += btn;
        displayVal = Number(display.textContent);
      }
    }
  }
}
