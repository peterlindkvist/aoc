import fs from "node:fs";

let input = fs.readFileSync("./2024/6/input.txt", "utf-8");

const startRows = input.split("\n").map((row) => row.split(""));
const moves = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let startPosition = [0, 0];

startRows.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "^") {
      startPosition = [x, y];
    }
  });
});
const width = startRows[0].length;
const height = startRows.length;
console.log(startRows.map((row) => row.join("")).join("\n"));

startRows[startPosition[1]][startPosition[0]] = "X";
const cntMax = 10000;
let loopsDetected = 0;

function isOutside(position: number[]) {
  return (
    position[0] < 0 ||
    position[0] >= width ||
    position[1] < 0 ||
    position[1] >= height
  );
}

// brute force. We only need to check the positions from run1.
startRows.forEach((row, y) => {
  row.forEach((cell, x) => {
    let cnt = 0;
    let direction = 0;
    let position = [...startPosition];
    const visited = new Set();
    const rows = startRows.map((row) => row.slice());
    rows[y][x] = "#";
    if (y === startPosition[1] && x === startPosition[0]) {
      console.log("skip", position);
    } else {
      while (cnt++ < cntMax) {
        let [dx, dy] = moves[direction];
        let nextPosition = [position[0] + dx, position[1] + dy];

        if (isOutside(nextPosition)) {
          break;
        }
        if (rows[nextPosition[1]][nextPosition[0]] === "#") {
          direction = (direction + 1) % 4;
          [dx, dy] = moves[direction];

          nextPosition = [position[0] + dx, position[1] + dy];

          if (rows[nextPosition[1]][nextPosition[0]] === "#") {
            direction = (direction + 1) % 4;
            [dx, dy] = moves[direction];
            nextPosition = [position[0] + dx, position[1] + dy];
          }
        }
        position = [position[0] + dx, position[1] + dy];
        rows[position[1]][position[0]] = "X";
        if (visited.has(`${position.join(",")},${direction}`)) {
          loopsDetected++;
          break;
        }

        visited.add(`${position.join(",")},${direction}`);
      }
    }
  });
});

console.log(loopsDetected);
