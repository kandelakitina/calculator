// handlers.js
import { state } from "./state.js";
import { operate } from "./operators.js";
import { updateDisplay } from "./display.js";

export function handleNumber(el, calculator) {
    let num = el.textContent;
    if (state.waitingForSecondOperand) {
        state.currentValue = num;
        state.waitingForSecondOperand = false;
    } else if (state.currentValue === '0' || state.currentValue === 'Error') {
        state.currentValue = num;
    } else {
        state.currentValue += num;
    }
    updateDisplay(calculator);
}

export function handleClear(el, calculator) {
    state.currentValue = "0";
    state.previousValue = null;
    updateDisplay(calculator);
}

export function handleDelete(el, calculator) {
    state.currentValue = state.currentValue.slice(0, -1) || "0";
    updateDisplay(calculator);
}

export function handleDecimal(el, calculator) {
    if (!state.currentValue.includes(".")) {
        state.currentValue = state.currentValue + ".";
    }
    updateDisplay(calculator);
}

export function handleOperator(el, calculator) {
    const operator = el.textContent;
    if (state.currentValue !== "0" && state.currentValue !== "Error") {
        if (state.previousValue !== null && state.operator) {
            state.currentValue = operate(state.previousValue, state.operator, state.currentValue);
        }
        state.previousValue = state.currentValue;
        state.currentValue = "0";
        state.operator = operator;
    }
    updateDisplay(calculator);
}

export function handleEquals(_, calculator) {
    try {
        if (state.operator && state.previousValue !== null) {
            const result = operate(state.previousValue, state.operator, state.currentValue);
            state.lastOperator = state.operator;
            state.lastOperand = state.currentValue;
            state.currentValue = result;
            state.previousValue = null;
            state.operator = null;
            updateDisplay(calculator);
            return;
        }
        if (state.lastOperator && state.lastOperand !== null) {
            const result = operate(state.currentValue, state.lastOperator, state.lastOperand);
            state.currentValue = result;
            updateDisplay(calculator);
        }
    } catch (e) {
        state.currentValue = e.message || "Error";
        state.previousValue = null;
        state.operator = null;
        updateDisplay(calculator);
    }
}

export const handlerMap = {
    number: handleNumber,
    equals: handleEquals,
    clear: handleClear,
    delete: handleDelete,
    decimal: handleDecimal,
    operator: handleOperator,
};