import fs from "node:fs";

let input = fs.readFileSync("./2024/4/input.txt", "utf-8");

const rows = input.split("\n");
const cells = rows.map((row) => row.split(""));
console.log(cells.map((row) => row.join("")).join("\n"));

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
const letters = "XMAS".split("");

let sum = 0;

cells.forEach((row, y) => {
  row.forEach((cell, x) => {
    const match = directions.filter(([dx, dy]) => {
      return letters.every((letter, position) => {
        const letterX = x + dx * position;
        const letterY = y + dy * position;
        if (
          letterX >= 0 &&
          letterX < row.length &&
          letterY >= 0 &&
          letterY < cells.length
        ) {
          const correctLetter = cells[letterY][letterX] === letter;
          console.log(x, y, letter, letterX, letterY, correctLetter);
          return correctLetter;
        }
      });
    });
    sum += match.length;
  });
});

console.log(sum);
