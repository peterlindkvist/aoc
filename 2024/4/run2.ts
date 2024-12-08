import fs from "node:fs";

let input = fs.readFileSync("./2024/4/input.txt", "utf-8");

const rows = input.split("\n");
const cells = rows.map((row) => row.split(""));

let sum = 0;

cells.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (
      y > 0 &&
      y < cells.length - 1 &&
      x > 0 &&
      x < row.length - 1 &&
      cell === "A"
    ) {
      const NW = cells[y - 1][x - 1] === "M" && cells[y + 1][x + 1] === "S";
      const SE = cells[y - 1][x - 1] === "S" && cells[y + 1][x + 1] === "M";
      const SW = cells[y + 1][x - 1] === "M" && cells[y - 1][x + 1] === "S";
      const NE = cells[y + 1][x - 1] === "S" && cells[y - 1][x + 1] === "M";

      if ((NE || SW) && (SE || NW)) {
        cells[y][x] = "#";
        sum += 1;
      }
    }
  });
});
console.log(cells.map((row) => row.join("")).join("\n"));

console.log(sum);
