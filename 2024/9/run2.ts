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

console.log(disk.length);
console.log(disk.map((c) => (c === -1 ? "." : c)).join(""));

const ignore = new Set();

for (const _ of disk) {
  const lastCharLastPos = disk.findLastIndex((c) => c !== -1 && !ignore.has(c));
  const lastChar = disk[lastCharLastPos];
  const lastCharPos = disk.findIndex((c, i) => c === lastChar);
  const lastCharLen = lastCharLastPos - lastCharPos + 1;
  const move = disk.slice(lastCharPos, lastCharLastPos + 1);

  let cnt = 0;
  let firstSpacePos = -1;
  for (const c of disk) {
    if (c === -1) {
      const hasSpace = move.every((m, i) => {
        return disk[cnt + i] === -1;
      });
      if (hasSpace) {
        firstSpacePos = cnt;
        break;
      }
    }
    cnt++;
  }

  // console.log({
  //   lastCharLastPos,
  //   lastChar,
  //   lastCharEnd: disk[lastCharLastPos],
  //   lastCharPos,
  //   lastCharLen,
  //   firstSpacePos,
  //   move,
  //   disk: disk.map((c) => (c === -1 ? "." : c)).join(""),
  // });

  if (firstSpacePos !== -1 && firstSpacePos < lastCharPos) {
    move.forEach((c, i) => {
      disk[firstSpacePos + i] = c;
      disk[lastCharPos + i] = -1;
    });
  }
  ignore.add(lastChar);
}

// console.log(disk.join(","));
// ok
// 00992111777.44.333....5555.6666.....8888..
// 00992111777.44.333....5555.6666.....8888..

console.log(disk.map((c) => (c === -1 ? "." : c)).join(""));

const sum = disk.reduce((acc, c, i) => acc + (c === -1 ? 0 : c * i), 0);
console.log(sum);
