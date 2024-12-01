import fs from "node:fs";

let input = fs.readFileSync("./2023/3/input.txt", "utf-8");

const rows = input.split("\n");
const cells = rows.map((row) => row.split(""));
const adjacent: Array<Array<[number, number]>> = rows.map((row) =>
  row.split("").map((cell) => [-1, -1])
);
const gears: Array<Array<Array<number>>> = rows.map((row) =>
  row.split("").map((cell) => [])
);

cells.forEach((row, rowIndex) =>
  row.forEach((cell, cellIndex) => {
    const isSymbol = cell.match(/[\*]/);
    // const isSymbol = cell.match(/[^0-9.]/);
    if (isSymbol) {
      adjacent[rowIndex - 1][cellIndex - 1] = [rowIndex, cellIndex];
      adjacent[rowIndex - 1][cellIndex] = [rowIndex, cellIndex];
      adjacent[rowIndex - 1][cellIndex + 1] = [rowIndex, cellIndex];
      adjacent[rowIndex][cellIndex - 1] = [rowIndex, cellIndex];
      adjacent[rowIndex][cellIndex] = [rowIndex, cellIndex];
      adjacent[rowIndex][cellIndex + 1] = [rowIndex, cellIndex];
      adjacent[rowIndex + 1][cellIndex - 1] = [rowIndex, cellIndex];
      adjacent[rowIndex + 1][cellIndex] = [rowIndex, cellIndex];
      adjacent[rowIndex + 1][cellIndex + 1] = [rowIndex, cellIndex];
    }
  })
);

let isAdjacent = false;
let sum = 0;
let currentNumber = "";
let currentGear: [number, number] | undefined;

cells.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    // console.log(cell, adjacent[rowIndex][cellIndex], !!cell.match(/[0-9]/));
    if (cell.match(/[0-9]/)) {
      currentNumber += cell;
      if (adjacent[rowIndex][cellIndex][0] !== -1) {
        isAdjacent = true;
        currentGear = adjacent[rowIndex][cellIndex];
      }
    } else {
      if (isAdjacent && currentNumber !== "") {
        isAdjacent = false;
        console.log("sum", sum, currentNumber);
        gears[currentGear![0]][currentGear![1]].push(parseInt(currentNumber));
      }
      currentNumber = "";
      currentGear = undefined;
    }
  });
  if (isAdjacent && currentNumber !== "") {
    isAdjacent = false;
    console.log("newRow", sum, currentNumber);
    gears[currentGear![0]][currentGear![1]].push(parseInt(currentNumber));
  }
  currentNumber = "";
  currentGear = undefined;
});

gears.forEach((row, rowIndex) =>
  row.forEach((gear, gearIndex) => {
    console.log(
      "gear",
      gear.length,
      gear,
      gear.reduce((acc, current) => acc * current, 1)
    );
    if (gear.length > 1) {
      sum += gear.reduce((acc, current) => acc * current, 1);
    }
  })
);

console.log(cells.map((row) => row.join("")).join("\n"));
console.log(adjacent.map((row) => row.join("")).join("\n"));
console.log(gears);
console.log(sum);
