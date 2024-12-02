import fs from "node:fs";

let input = fs.readFileSync("./2024/2/input.txt", "utf-8");

const rows = input.split("\n");

function isIncreasing(cells: number[]) {
  return cells.every((cell, index) =>
    index === 0 ? true : cell > cells[index - 1] && cell <= cells[index - 1] + 3
  );
}

function isDecreasing(cells: number[]) {
  return cells.every((cell, index) =>
    index === 0 ? true : cell < cells[index - 1] && cell >= cells[index - 1] - 3
  );
}

let sum = 0;

for (const row of rows) {
  let isOk = false;
  const cells = row.split(" ").map((cell) => parseInt(cell));
  if (cells.length < 2) {
  } else if (isIncreasing(cells)) {
    isOk = true;
  } else if (isDecreasing(cells)) {
    isOk = true;
  } else {
    const seed = cells.map((_, i) => i);
    const isPartiallyIncreasing = seed.some((index) => {
      const modifiedCells = cells.filter((_, i) => i !== index);
      return isIncreasing(modifiedCells);
    });
    if (isPartiallyIncreasing) {
      isOk = true;
    } else {
      const isPartiallyDecreasing = seed.some((index) => {
        const modifiedCells = cells.filter((_, i) => i !== index);
        return isDecreasing(modifiedCells);
      });
      if (isPartiallyDecreasing) {
        isOk = true;
      }
    }
  }
  sum += isOk ? 1 : 0;
  console.log(row, isOk);
}

console.log(sum);
