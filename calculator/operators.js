// operators.js
export const operatorFuncs = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error("Error");
        return a / b;
    },
};

export function operate(a, operator, b) {
    const func = operatorFuncs[operator];
    if (!func) throw new Error(`Unknown operator: ${operator}`);
    return func(Number(a), Number(b)).toString();
}