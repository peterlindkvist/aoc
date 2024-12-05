import fs from "node:fs";

let input = fs.readFileSync("./2024/2/input.txt", "utf-8");

const rows = input.split("\n");

function isSafe(cells: number[]) {
  const isDecreasing = cells.every((cell, index) =>
    index === 0 ? true : cell < cells[index - 1] && cell >= cells[index - 1] - 3
  );
  const isIncreasing = cells.every((cell, index) =>
    index === 0 ? true : cell > cells[index - 1] && cell <= cells[index - 1] + 3
  );
  return isDecreasing || isIncreasing;
}

let sum = 0;

for (const row of rows) {
  let isOk = false;
  const cells = row.split(" ").map((cell) => parseInt(cell));
  if (cells.length < 2) {
  } else if (isSafe(cells)) {
    isOk = true;
  } else {
    const seed = cells.map((_, i) => i);
    const isPartiallySafe = seed.some((index) => {
      const modifiedCells = cells.filter((_, i) => i !== index);
      return isSafe(modifiedCells);
    });
    if (isPartiallySafe) {
      isOk = true;
    }
  }
  sum += isOk ? 1 : 0;
  console.log(row, isOk);
}

console.log(sum);
