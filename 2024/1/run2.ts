import fs from "node:fs";

let input = fs.readFileSync("./2024/1/input.txt", "utf-8");

const rows = input.split("\n");

let leftList = [];
let rightList = [];

for (const row of rows) {
  const [left, right] = row.split("  ");
  leftList.push(parseInt(left.trim()));
  rightList.push(parseInt(right.trim()));
}

leftList = leftList.sort();
rightList = rightList.sort();

let sum = 0;
leftList.forEach((item, index) => {
  const similar = rightList.filter((rightItem) => rightItem === item);
  sum += item * similar.length;
});

console.log(sum);
