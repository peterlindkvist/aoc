import fs from "node:fs";

let input = fs.readFileSync("./2024/6/input.txt", "utf-8");

const rows = input.split("\n").map((row) => row.split(""));
const moves = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const path = ["|", "-", "|", "-"];
let startPosition = [0, 0];
rows.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "^") {
      startPosition = [x, y];
    }
  });
});
const width = rows[0].length;
const height = rows.length;
console.log(rows.map((row) => row.join("")).join("\n"));

console.log(startPosition);

// rows[position[1]][position[0]] = "X";

function buildChild(rows: string[][], position: number[]) {
  const clone = rows.map((row) => row.slice());
  clone[position[1]][position[0]] = "O";
  return clone;
}

function isOutside(position: number[]) {
  return (
    position[0] < 0 ||
    position[0] >= width ||
    position[1] < 0 ||
    position[1] >= height
  );
}

let loopVariants = 0;
const cntMax = 10000;
function runCourse(rows: string[][], runChild: boolean) {
  let direction = 0;
  let cnt = 0;
  const visited = new Set();
  let position = startPosition;
  // console.log("runChild", runChild);
  while (cnt++ < cntMax) {
    const [dx, dy] = moves[direction];

    position = [position[0] + dx, position[1] + dy];
    const nextPosition = [position[0] + dx, position[1] + dy];

    if (runChild) {
      const inLoop = runCourse(buildChild(rows, position), false);
      if (inLoop) {
        loopVariants++;
      }
    }
    // console.log(
    //   "position",
    //   cnt,
    //   position,
    //   width,
    //   height,
    //   dx,
    //   dy,
    //   nextPosition,
    //   direction,
    //   path
    // );

    visited.add(position.join(","));

    rows[position[1]][position[0]] = path[direction];
    if (
      !isOutside(nextPosition) &&
      ["#", "O"].includes(rows[nextPosition[1]][nextPosition[0]])
    ) {
      // console.log("hit a wall", rows[nextPosition[1]][nextPosition[0]]);
      rows[position[1]][position[0]] = "+";
      direction = (direction + 1) % 4;
      continue;
    } else if (isOutside(nextPosition)) {
      // console.log("out of bounds", position, nextPosition);
      break;
    }
  }

  // console.log("hasLoop", runChild, cnt);
  // console.log(rows.map((row) => row.join("")).join("\n"));

  if (cnt >= cntMax) {
    console.log("loopVariants", loopVariants);
    return true;
  }
  return false;
}

runCourse(
  rows.map((row) => row.slice()),
  true
);

console.log(loopVariants - 1);
