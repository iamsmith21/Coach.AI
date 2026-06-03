// Goal: Build a toy "scheduler" that mimics the JS event loop.
// Two queues. A "run" function. No setTimeout, no Promise. From scratch.

const microtasks = [];
const macrotasks = [];

function queueMicro(fn) {
  // TODO: add fn to microtasks
  microtasks.push(fn);

}

function queueMacro(fn) {
  // TODO: add fn to macrotasks
  macrotasks.push(fn)
}

function run() {
  // TODO:
  // Loop forever (until both queues empty)
  //   1. drain ALL microtasks
  //   2. run ONE macrotask

  while (microtasks.length > 0 || macrotasks.length > 0) {
    while (microtasks.length > 0) {
      const fn = microtasks.shift();
      fn();
    }

    if (macrotasks.length > 0) {
      const first = macrotasks.shift();
      first();
    }
  }


}

// Test it:
queueMacro(() => console.log('macro 1'));
queueMicro(() => console.log('micro 1'));
queueMacro(() => {
  console.log('macro 2');
  queueMicro(() => console.log('micro from macro 2'));
});
queueMicro(() => console.log('micro 2'));

run();
// Expected:
// micro 1
// micro 2
// macro 1
// macro 2
// micro from macro 2