import fs from "node:fs";

let input = fs.readFileSync("./2024/3/input.txt", "utf-8");

const rows = input.split("\n");

let sum = 0;

for (const row of rows) {
  const match = row.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  for (const m of match!) {
    const [a, b] = m
      .slice(4, -1)
      .split(",")
      .map((n) => parseInt(n, 10));
    sum += a * b;
    console.log(m, a, b);
  }
}

console.log(sum);
