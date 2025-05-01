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
    // operator: handleOperator,
};

const state = {
    currentValue: 0,
    previousValue: 0,
    waitingForSecondOperand: true,
};


// Called after each state change (number, operator, equals, etc)
function updateDisplay() {
    calculator.querySelector('.display-answer').textContent = state.currentValue;
    // optionally set history in another display line
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

function handleEquals(el) {
    state.waitingForSecondOperand = true;
}

function handleClear(el) {
    state.currentValue = "0";
    updateDisplay();
}

function handleDelete(el) {
    state.currentValue = state.currentValue.slice(0, (state.currentValue.length - 1));
    updateDisplay();
}

function handleDecimal(el) {
    if(!state.currentValue.includes(".")) {
    	state.currentValue = state.currentValue + ".";
    };
    updateDisplay();
}

// function handleOperator(el) {
//     const operator = el.textContent;
//     console.log(`You pressed: ${operator}`);
// }




// // Math

// export function add(a, b) {
//     return a + b;
// }

// export function subtract(a, b) {
//     return a - b;
// }

// export function multiply(a, b) {
//     return a * b;
// }

// export function divide(a, b) {
//     if (b === 0) throw new Error("Cannot divide by zero");
//     return a / b;
// }


// export function operate(operator, a, b) {
//     return operator(a, b);
// }