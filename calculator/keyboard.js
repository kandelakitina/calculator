// keyboard.js
import { handleNumber, handleDecimal, handleOperator, handleEquals, handleDelete, handleClear } from './handlers.js';

export function initKeyboard(calcEl) {
    document.addEventListener("keydown", (e) => {
        if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        let key = e.key;

        if (/^[0-9]$/.test(key)) {
            handleNumber({ textContent: key }, calcEl);
            e.preventDefault();
            return;
        }
        if (key === '.' || key === ',') {
            handleDecimal({ textContent: '.' }, calcEl);
            e.preventDefault();
            return;
        }
        if (['+', '-', '*', '/'].includes(key)) {
            handleOperator({ textContent: key }, calcEl);
            e.preventDefault();
            return;
        }
        if (key === 'Enter' || key === '=') {
            handleEquals(null, calcEl);
            e.preventDefault();
            return;
        }
        if (key === 'Backspace') {
            handleDelete(null, calcEl);
            e.preventDefault();
            return;
        }
        if (key === 'Escape' || key.toLowerCase() === 'c') {
            handleClear(null, calcEl);
            e.preventDefault();
            return;
        }
    });
}