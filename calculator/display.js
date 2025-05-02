// display.js
import { state } from "./state.js";

export function updateDisplay(calculator) {
    calculator.querySelector('.display-answer').textContent = state.currentValue;

    let historyText = "";
    if (state.operator && state.previousValue !== null) {
        historyText = `${state.previousValue} ${state.operator}`;
    }
    calculator.querySelector('.display-history').textContent = historyText;
}