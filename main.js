import * as handlers from "./src/handlers.js";

const calculator = document.querySelector(".calculator");
// const number = calculator.querySelector(".number");
// const operator = calculator.querySelector(".operator");
// const equals = calculator.querySelector(".equals");

// mapper

const handlerMap = {
    number: handlers.handleNumber,
    operator: handlers.handleOperator,
    equals: handlers.handleEquals,
    clear: handlers.handleClear,
    delete: handlers.handleDelete,
    decimal: handlers.handleDecimal,
};

calculator.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    for (const className of e.target.classList) {
        if (handlerMap[className]) {
            handlerMap[className](e.target);
            break;
        }
    }
});