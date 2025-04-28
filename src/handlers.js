import { operate } from "./operate.js";
import * as mathFunctions from "./mathFunctions.js";

// state

let firstOperator = 0;
let secondOperator = 0;

// functions

function handleNumber(el) {
    const number = el.textContent;
    console.log("Number:", operate(mathFunctions.add, +number, +number));
}

function handleOperator(el) {
    console.log("Operator:", el.textContent);
}

function handleEquals(el) {
    console.log("Equals pressed");
}

function handleClear(el) {
    console.log("Clear pressed");
}

function handleDelete(el) {
    console.log("Delete pressed");
}

function handleDecimal(el) {
    console.log("Decimal pressed");
}


// export

export {
    handleNumber,
    handleOperator,
    handleEquals,
    handleClear,
    handleDelete,
    handleDecimal,
    handlerMap
};