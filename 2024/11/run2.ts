import fs from "node:fs";

let input = fs.readFileSync("./2024/11/input.txt", "utf-8");

let stones = input.split(" ").map((c) => parseInt(c));

const blinks = 75;
const firstBite = 40;
let cnt = 0;
const cache = new Map<number, number[]>();

function evaluateStone(stone: number): number[] {
  const fromCache = cache.get(stone);
  if (fromCache) {
    return fromCache;
  } else {
    let ret: number[];
    const stoneStr = `${stone}`;
    if (stone === 0) {
      ret = [1];
    } else if (stoneStr.length % 2 === 0) {
      const parts = stoneStr.split("");
      ret = [
        parseInt(parts.slice(0, stoneStr.length / 2).join("")),
        parseInt(parts.slice(stoneStr.length / 2).join("")),
      ];
    } else {
      ret = [stone * 2024];
    }
    cache.set(stone, ret);
    return ret;
  }
}

while (cnt++ < firstBite) {
  stones = stones.flatMap((stone) => evaluateStone(stone));
  console.log("first", cnt, stones.length);
}

let uniqueStones = [...new Set(stones)];
let stoneMap = new Map<number, number>();

let index = 0;
for (let stone of uniqueStones) {
  const progress = `(${index}/${uniqueStones.length})`;
  cnt = 0;
  index++;
  let stones = [stone];
  while (cnt++ < blinks - firstBite) {
    stones = stones.flatMap((stone) => evaluateStone(stone));
  }
  console.log("stone", stone, stones.length, progress);
  stoneMap.set(stone, stones.length);
}

const sum = stones.reduce((acc, stone) => acc + (stoneMap.get(stone) ?? 0), 0);

console.log("sum", sum);
