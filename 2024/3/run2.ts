import fs from "node:fs";

let input = fs.readFileSync("./2024/3/input.txt", "utf-8");

const rows = input.split("\n");

let sum = 0;

for (const row of rows) {
  const match = row.match(/(do|don't|mul)\([0-9]*,?[0-9]*\)/g);
  let enabled = true;
  let a: number = 0;
  let b: number = 0;
  for (const m of match!) {
    const [instruction, numbers] = m.split("(");
    if (instruction === "don't") {
      enabled = false;
    } else if (instruction === "do") {
      enabled = true;
    }
    if (enabled && instruction === "mul") {
      [a, b] = numbers.split(",").map((n) => parseInt(n, 10));
      if (a !== undefined && b !== undefined) {
        sum += a * b;
      }
    }
    console.log(m, instruction, enabled, m, `${a}x${b}=${a * b}`);
    a = 0;
    b = 0;
  }
}

console.log(sum);
