import fs from "node:fs";

let input = fs.readFileSync("./2023/3/input.txt", "utf-8");

const rows = input.split("\n");
const cells = rows.map((row) => row.split(""));
const adjacent = rows.map((row) => row.split("").map((cell) => "0"));

cells.forEach((row, rowIndex) =>
  row.forEach((cell, cellIndex) => {
    const isSymbol = cell.match(/[\*]/);
    // const isSymbol = cell.match(/[^0-9.]/);
    if (isSymbol) {
      adjacent[rowIndex - 1][cellIndex - 1] = "X";
      adjacent[rowIndex - 1][cellIndex] = "X";
      adjacent[rowIndex - 1][cellIndex + 1] = "X";
      adjacent[rowIndex][cellIndex - 1] = "X";
      adjacent[rowIndex][cellIndex] = "S";
      adjacent[rowIndex][cellIndex + 1] = "X";
      adjacent[rowIndex + 1][cellIndex - 1] = "X";
      adjacent[rowIndex + 1][cellIndex] = "X";
      adjacent[rowIndex + 1][cellIndex + 1] = "X";
    }
  })
);

let isAdjacent = false;
let sum = 0;
let currentNumber = "";

cells.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    // console.log(cell, adjacent[rowIndex][cellIndex], !!cell.match(/[0-9]/));
    if (cell.match(/[0-9]/)) {
      currentNumber += cell;
      if (adjacent[rowIndex][cellIndex] === "X") {
        isAdjacent = true;
      }
    } else {
      if (isAdjacent && currentNumber !== "") {
        isAdjacent = false;
        console.log("sum", sum, currentNumber);
        sum += parseInt(currentNumber ?? "0");
      }
      currentNumber = "";
    }
  });
  if (isAdjacent && currentNumber !== "") {
    isAdjacent = false;
    console.log("newRow", sum, currentNumber);
    sum += parseInt(currentNumber);
  }
  currentNumber = "";
});

console.log(cells.map((row) => row.join("")).join("\n"));
console.log(adjacent.map((row) => row.join("")).join("\n"));
console.log(sum);
