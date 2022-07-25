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
  return operator(a, b);
}

let displayVal;

buttons.forEach((button) => button.addEventListener("click", updateDisplay));

function updateDisplay(e) {
  const btn = e.target.textContent;
  if (btn === "C") {
    display.textContent = "";
  } else if (btn === "=") {
  } else {
    display.textContent += btn;
    if (btn === "+" || btn === "*" || btn === "-" || btn === "÷") {
    } else {
      displayVal = Number(display.textContent);
    }
  }
}
