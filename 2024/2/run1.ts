import fs from "node:fs";

let input = fs.readFileSync("./2024/2/input.txt", "utf-8");

const rows = input.split("\n");

let sum = 0;

for (const row of rows) {
  console.log(row);
  const cells = row.split(" ").map((cell) => parseInt(cell));
  const isIncreasing = cells.every((cell, index) =>
    index === 0 ? true : cell > cells[index - 1] && cell <= cells[index - 1] + 3
  );
  const isDecrecing = cells.every((cell, index) =>
    index === 0 ? true : cell < cells[index - 1] && cell >= cells[index - 1] - 3
  );
  console.log(cells, isIncreasing, isDecrecing);
  if (isIncreasing || isDecrecing) {
    sum += 1;
  }
}

console.log(sum);
