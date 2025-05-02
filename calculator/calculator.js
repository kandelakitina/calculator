// calculator.js
import { handlerMap } from './handlers.js';
import { initKeyboard } from './keyboard.js';

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    for (const className of e.target.classList) {
        if (handlerMap[className]) {
            handlerMap[className](e.target, calculator);
            break;
        }
    }
});

initKeyboard(calculator);