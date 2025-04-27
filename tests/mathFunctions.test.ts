// calculator_test.ts
import {
  add,
  subtract,
  multiply,
  divide,
} from "../src/mathFunctions.ts";
import { assertEquals } from "@std/assert";

Deno.test("addition works correctly", () => {
  assertEquals(add(2, 3), 5);
  assertEquals(add(-1, 1), 0);
  assertEquals(add(0, 0), 0);
});

Deno.test("subtraction works correctly", () => {
  assertEquals(subtract(5, 3), 2);
  assertEquals(subtract(0, 5), -5);
});

Deno.test("multiplication works correctly", () => {
  assertEquals(multiply(2, 3), 6);
  assertEquals(multiply(-2, 3), -6);
  assertEquals(multiply(0, 5), 0);
});

Deno.test("division works correctly", () => {
  assertEquals(divide(6, 3), 2);
  assertEquals(divide(-6, 3), -2);
});
