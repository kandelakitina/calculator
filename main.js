let calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    for (const className of e.target.classList) {
        if (handlerMap[className]) {
            handlerMap[className](e.target);
            break;
        }
    }
});

const handlerMap = {
    number: handleNumber,
    equals: handleEquals,
    clear: handleClear,
    delete: handleDelete,
    decimal: handleDecimal,
    operator: handleOperator,
};

const state = {
    currentValue: "0",
    previousValue: "0",
    operator: null,
    lastOperator: null,
    lastOperand: null,
    waitingForSecondOperand: true,
};

function updateDisplay() {
    calculator.querySelector('.display-answer').textContent = state.currentValue;

    // Show history
    let historyText = "";
    if (state.operator && state.previousValue !== "0") {
        // Operation in progress
        historyText = `${state.previousValue} ${state.operator}`;
    } else {
        historyText = ""; // Or whatever default
    }
    calculator.querySelector('.display-history').textContent = historyText;

    // console.log(state);
}

function handleNumber(el) {
    let num = el.textContent;
    if (state.waitingForSecondOperand) {
        state.currentValue = num;
        state.waitingForSecondOperand = false;
    } else if (state.currentValue === '0' || state.currentValue === 'Error') {
        state.currentValue = num;
    } else {
        state.currentValue += num;
    }
    updateDisplay();
}


function handleClear(el) {
    state.currentValue = "0";
    state.previousValue = "0";
    updateDisplay();
}

function handleDelete(el) {
    state.currentValue = state.currentValue.slice(0, -1) || "0";
    updateDisplay();
}

function handleDecimal(el) {
    if (!state.currentValue.includes(".")) {
        state.currentValue = state.currentValue + ".";
    };
    updateDisplay();
}


function handleOperator(el) {
    const operator = el.textContent;
    if (state.currentValue !== "0" && state.currentValue !== "Error") {
        if (state.previousValue !== "0" && state.operator) {
            state.currentValue = operate(state.previousValue, state.operator, state.currentValue);
        }
        state.previousValue = state.currentValue;
        state.currentValue = "0";
        state.operator = operator;
    }
    updateDisplay();
}

const operatorFuncs = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error("Error");
        return a / b;
    },
};

function operate(a, operator, b) {
    const func = operatorFuncs[operator];
    if (!func) throw new Error(`Unknown operator: ${operator}`);
    return func(Number(a), Number(b)).toString();
}

function handleEquals() {
    try {
        // If there's an operation to do (normal case)
        if (state.operator && state.previousValue !== "0") {
            const result = operate(state.previousValue, state.operator, state.currentValue);
            // Save for repeat '='
            state.lastOperator = state.operator;
            state.lastOperand = state.currentValue; // what was just used as the "right side"
            state.currentValue = result;
            state.previousValue = "0";
            state.operator = null;
            updateDisplay();
            return;
        }
        // If equals is pressed again, repeat the last operation
        if (state.lastOperator && state.lastOperand !== null) {
            const result = operate(state.currentValue, state.lastOperator, state.lastOperand);
            state.currentValue = result;
            updateDisplay();
        }
    } catch (e) {
        state.currentValue = e.message || "Error";
        state.previousValue = "0";
        state.operator = null;
        updateDisplay();
    }
}