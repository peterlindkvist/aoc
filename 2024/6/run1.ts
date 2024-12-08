import fs from "node:fs";

let input = fs.readFileSync("./2024/6/input.txt", "utf-8");

const rows = input.split("\n").map((row) => row.split(""));
const moves = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let direction = 0;
let position = [0, 0];

rows.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "^") {
      position = [x, y];
    }
  });
});
const width = rows[0].length;
const height = rows.length;
console.log(rows.map((row) => row.join("")).join("\n"));

console.log(position);

rows[position[0]][position[1]] = "X";

let cnt = 0;
while (cnt++ < 100000) {
  const [dx, dy] = moves[direction];

  position = [position[0] + dx, position[1] + dy];
  const nextPosition = [position[0] + dx, position[1] + dy];
  console.log(
    "position",
    cnt,
    position,
    width,
    height,
    dx,
    dy,
    nextPosition
    // rows[nextPosition[1]][nextPosition[0]]
  );
  rows[position[1]][position[0]] = "X";
  if (
    position[0] < 0 ||
    position[0] >= width - 1 ||
    position[1] < 0 ||
    position[1] >= height - 1
  ) {
    console.log("out of bounds");
    break;
  } else if (rows[nextPosition[1]][nextPosition[0]] === "#") {
    console.log("hit a wall");
    direction = (direction + 1) % 4;
  }
}
console.log(rows.map((row) => row.join("")).join("\n"));

const sum = rows.flat().filter((cell) => cell === "X").length;

console.log(sum);
