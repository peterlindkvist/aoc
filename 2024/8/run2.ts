import fs from "node:fs";

let input = fs.readFileSync("./2024/8/input.txt", "utf-8");

const rows = input.split("\n").map((row) => row.split(""));

console.log(rows.map((row) => row.join("")).join("\n"));

const frequencies: Record<string, Array<number[]>> = {};
rows.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell !== ".") {
      frequencies[cell] = frequencies[cell]
        ? [...frequencies[cell], [x, y]]
        : [[x, y]];
    }
  });
});

console.log(frequencies);
const antiNodes = new Set();

function isOutside(position: number[]) {
  return (
    position[0] < 0 ||
    position[0] >= rows[0].length ||
    position[1] < 0 ||
    position[1] >= rows.length
  );
}

const steps = new Array(100).fill(0).map((_, i) => i);

for (const [char, frequency] of Object.entries(frequencies)) {
  frequency.forEach(([ax, ay]) => {
    frequency.forEach(([bx, by]) => {
      if (ax !== bx && ay !== by) {
        const dx = bx - ax;
        const dy = by - ay;
        steps.forEach((i) => {
          const an1 = [ax - i * dx, ay - i * dy];
          const an2 = [bx + i * dx, by + i * dy];
          console.log(char, i, an1, an2);
          if (!isOutside(an1)) {
            antiNodes.add(an1.join(":"));
          }
          if (!isOutside(an2)) {
            antiNodes.add(an2.join(":"));
          }
        });
      }
    });
  });
}

console.log(antiNodes, antiNodes.size);