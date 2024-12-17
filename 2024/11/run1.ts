import fs from "node:fs";

let input = fs.readFileSync("./2024/11/input.txt", "utf-8");

let stones = input.split(" ").map((c) => parseInt(c));

const blinks = 25;
let cnt = 0;

function evaluateStone(stone: number): number[] {
  const stoneStr = `${stone}`;
  if (stone === 0) {
    return [1];
  } else if (stoneStr.length % 2 === 0) {
    const parts = stoneStr.split("");
    return [
      parseInt(parts.slice(0, stoneStr.length / 2).join("")),
      parseInt(parts.slice(stoneStr.length / 2).join("")),
    ];
  } else {
    return [stone * 2024];
  }
}

while (cnt++ < blinks) {
  stones = stones.flatMap((stone) => evaluateStone(stone));
  console.log(cnt, stones.length);
}
