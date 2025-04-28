import {
    add,
    subtract,
    multiply,
    divide,
} from "../src/mathFunctions.js";
import { operate } from "../src/operate.js";
import { assertEquals, assertThrows } from "@std/assert";

Deno.test("running addition via operate function", () => {
    assertEquals(operate(add, 5, 3), 8);
});

Deno.test("running subtraction via operate function", () => {
    assertEquals(operate(subtract, 5, 3), 2);
});

Deno.test("running multiplication via operate function", () => {
    assertEquals(operate(multiply, 5, 3), 15);
});

Deno.test("running division via operate function", () => {
    assertEquals(operate(divide, 6, 3), 2);
});

Deno.test("running division via operate function with zero divisor", () => {
    assertThrows(
        () => operate(divide, 6, 0),
        Error,
        "Cannot divide by zero",
    );
});