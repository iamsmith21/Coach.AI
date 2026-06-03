// ==========================================
// Phase 1 Day 2: Closures & 'this' Puzzles
// ==========================================

console.log("=== PUZZLE 1: The Loop Trap ===");
// Predict the outputs on paper before uncommenting and running.
/*
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let j:', j), 100);
}
*/


console.log("\n=== PUZZLE 2: Implicit vs Lost Binding ===");
/*
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

user.greet(); // Call Site 1

const greetUser = user.greet;
greetUser(); // Call Site 2
*/


console.log("\n=== PUZZLE 3: Arrow Functions & 'this' ===");
/*
const group = {
  title: 'Engineering',
  members: ['Bob', 'Charlie'],
  showMembers() {
    this.members.forEach(function(member) {
      // Regular function callback
      console.log(`${this.title}: ${member}`);
    });
  },
  showMembersArrow() {
    this.members.forEach((member) => {
      // Arrow function callback
      console.log(`${this.title}: ${member}`);
    });
  }
};

group.showMembers();
group.showMembersArrow();
*/


console.log("\n=== PUZZLE 4: Polymorphic Add ===");
/*
// Implement a function 'add' that can be called in both ways:
// add(2, 3) => 5
// add(2)(3) => 5

function add(a, b) {
  // TODO: implement using closures/arguments length check
}

console.log("add(2, 3):", add(2, 3));
console.log("add(2)(3):", add(2)(3));
*/
