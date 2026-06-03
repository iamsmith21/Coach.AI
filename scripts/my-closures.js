// ==========================================
// Phase 1 Day 2: Closures & 'this' Exercises
// ==========================================

/**
 * 1. makeCounter()
 * ----------------
 * Goal: Return a function that increments and returns a count variable.
 * Closure: The returned function should close over the 'count' variable.
 */
function makeCounter() {
  // TODO: Declare a 'count' variable here.
  let count = 0;
  // TODO: Return a function that increments 'count' and returns it.
  return function() {
    count++;
    return count;
  };
}

/**
 * 2. once(fn)
 * -----------
 * Goal: Return a function that can only invoke 'fn' once.
 * Subsequent calls should just return the result of the first invocation.
 * Closure: The returned function closes over a boolean flag (e.g. 'hasRun') and a 'result' variable.
 */
function once(fn) {
  // TODO: Keep track of whether 'fn' has been called.
  // TODO: Keep track of the 'result' of the first call.

  // TODO: Return a function.
  // In the returned function:
  // - If it hasn't run yet, call 'fn' with the given arguments, save the result, mark as run.
  // - Return the saved result.
}

/**
 * 3. memoize(fn)
 * --------------
 * Goal: Return a cached version of 'fn' based on its arguments.
 * Closure: The returned function closes over a cache object (e.g. Map or object).
 */
function memoize(fn) {
  // TODO: Declare a cache (e.g. an object or a Map).

  // TODO: Return a function that accepts arguments.
  // In the returned function:
  // - Generate a cache key from the arguments (hint: JSON.stringify(args) or just args[0]).
  // - Check if the key exists in the cache.
  // - If not, call 'fn' with the arguments, save it to cache.
  // - Return the cached result.
}

/**
 * 4. debounce(fn, delay)
 * ----------------------
 * Goal: Return a function that delays invoking 'fn' until 'delay' ms have passed since the last call.
 * Closure: The returned function closes over a 'timeoutId' variable.
 */
function debounce(fn, delay) {
  // TODO: Declare a 'timeoutId' variable.

  // TODO: Return a function.
  // In the returned function:
  // - Clear any existing timeout (hint: clearTimeout(timeoutId)).
  // - Set a new timeout using setTimeout.
  // - When the timeout fires, call 'fn' with the arguments.
}

/**
 * 5. myBind(ctx, ...args)
 * -----------------------
 * Goal: Re-implement Function.prototype.bind.
 * Do NOT use the native .bind() inside your implementation.
 * You may use .apply() or .call().
 */
Function.prototype.myBind = function(ctx, ...boundArgs) {
  // 'this' refers to the original function we want to bind (e.g., fn)
  const originalFn = this;

  // TODO: Return a new function that accepts new arguments.
  // When that new function is invoked, call 'originalFn' using .apply or .call,
  // passing 'ctx' as the this-context, and merging 'boundArgs' with the new args.
};

// ==========================================
// TEST CASES (Run with: node scripts/my-closures.js)
// ==========================================

console.log("--- Testing makeCounter ---");
const counter = makeCounter();
if (typeof counter === 'function') {
  console.log("Count:", counter()); // Expected: 1
  console.log("Count:", counter()); // Expected: 2
}

console.log("\n--- Testing once ---");
let executionCount = 0;
const initialize = once(() => {
  executionCount++;
  return "DB Connected";
});
console.log(initialize()); // Expected: "DB Connected"
console.log(initialize()); // Expected: "DB Connected"
console.log("Execution count (should be 1):", executionCount);

console.log("\n--- Testing memoize ---");
let expensiveCalls = 0;
const square = memoize((x) => {
  expensiveCalls++;
  return x * x;
});
console.log("Square 4:", square(4)); // Expected: 16 (expensiveCalls: 1)
console.log("Square 4 again:", square(4)); // Expected: 16 (expensiveCalls: 1)
console.log("Expensive calls (should be 1):", expensiveCalls);

console.log("\n--- Testing myBind ---");
const person = { name: "Bob" };
function greet(greeting, punctuation) {
  return `${greeting}, my name is ${this.name}${punctuation}`;
}
const greetBob = greet.myBind(person, "Hello");
console.log(greetBob("!")); // Expected: "Hello, my name is Bob!"

console.log("\n--- Testing debounce ---");
console.log("Debounce test scheduled... (waiting 500ms)");
let debouncedCalls = 0;
const logMessage = debounce((msg) => {
  debouncedCalls++;
  console.log(`Debounced message: ${msg} (calls: ${debouncedCalls})`);
}, 300);

logMessage("Attempt 1");
logMessage("Attempt 2");
logMessage("Attempt 3"); // Only this one should fire after 300ms
