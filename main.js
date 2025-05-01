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
    currentValue: 0,
    previousValue: null,
    operator: null,
    lastOperator: null,
    lastOperand: null,
    waitingForSecondOperand: true,
};

function updateDisplay() {
    calculator.querySelector('.display-answer').textContent = state.currentValue;
    // optionally set history in another display line
    console.log(state);
}

function handleNumber(el) {
    let num = el.textContent;
    if (state.waitingForSecondOperand) {
        state.currentValue = num;
        state.waitingForSecondOperand = false;
    } else if (state.currentValue === '0') {
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
    state.currentValue = state.currentValue.slice(0, (state.currentValue.length - 1));
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
    if (state.currentValue !== 0) {
        if (state.previousValue !== null && state.operator) {
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
        if (b === 0) throw new Error("YOU DIED");
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
        if (state.operator && state.previousValue !== null) {
            const result = operate(state.previousValue, state.operator, state.currentValue);
            // Save for repeat '='
            state.lastOperator = state.operator;
            state.lastOperand = state.currentValue; // what was just used as the "right side"
            state.currentValue = result;
            state.previousValue = null;
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
        state.previousValue = null;
        state.operator = null;
        updateDisplay();
    }
}