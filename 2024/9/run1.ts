import fs from "node:fs";

let input = fs.readFileSync("./2024/9/input.txt", "utf-8");

const blocks = input.split("").map((c) => parseInt(c));

let disk: number[] = [];
let pos = 0;

blocks.forEach((block, i) => {
  const char = i % 2 === 0 ? pos++ : -1;
  const bytes = new Array(block).fill(char);
  console.log(i, char, bytes);
  disk.push(...bytes);
});

console.log(disk.join(""));

for (const _ of disk) {
  const firstSpacePos = disk.findIndex((c) => c === -1);
  const lastCharPos = disk.findLastIndex((c) => c !== -1);
  disk[firstSpacePos] = disk[lastCharPos];
  disk[lastCharPos] = -1;
}

console.log(disk.join(""));

const sum = disk.reduce((acc, c, i) => acc + (c === -1 ? 0 : c * i), 0);
console.log(sum);
