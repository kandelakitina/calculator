# 🛠 Calculator Project: TDD Milestones

## ✅ M1: Project Initialization
- [ ] Learn Deno

---

## 🔢 M2: Core Arithmetic Functions
- [ ] Write failing tests for `add(a, b)`
- [ ] Implement `add(a, b)` to pass the test
- [ ] Write failing tests for `subtract(a, b)`
- [ ] Implement `subtract(a, b)` to pass the test
- [ ] Write failing tests for `multiply(a, b)`
- [ ] Implement `multiply(a, b)` to pass the test
- [ ] Write failing tests for `divide(a, b)`
- [ ] Implement `divide(a, b)` to pass the test
- [ ] Write tests to handle division by zero (edge case)

---

## ⚙️ M3: Operation Dispatcher (`operate`)
- [ ] Write failing tests for `operate(operator, a, b)`
- [ ] Implement `operate` to correctly route to math functions
- [ ] Write tests to handle invalid operators

---

## 🎨 M4: Basic UI Skeleton
- [ ] Build HTML layout (buttons, display)
- [ ] (Optional) Mock UI unit tests: check if elements exist
- [ ] Add dummy event handlers to buttons
- [ ] Verify that button clicks are registered

---

## 🧠 M5: Input Handling and State Management
- [ ] Write failing tests for:
  - capturing user input
  - saving first number
  - saving operator
  - saving second number
- [ ] Implement input capture logic
- [ ] Connect input flow to `operate`
- [ ] Write tests for:
  - executing calculation with `=`
  - updating display with result
  - clearing all inputs with `C`

---

## ⚡ M6: Advanced Behaviors
- [ ] Write tests for:
  - rounding long decimals
  - preventing multiple decimals in a number
  - rejecting consecutive operator inputs
  - automatically using previous result as first number
  - division by zero behavior (custom error message)

---

## ✨ M7: Extra Features
- [ ] Write failing tests for:
  - decimal point (`.`) input
  - backspace function
  - keyboard support
- [ ] Implement and pass tests for each extra feature

---

# 🔥 Core TDD Workflow
1. Write a **failing test** for the next feature.
2. **Implement minimal code** to pass the test.
3. **Refactor** without breaking the test.
4. Commit changes with clear messages (e.g., `feat: add addition function with tests`).

