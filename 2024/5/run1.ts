import fs from "node:fs";

let input = fs.readFileSync("./2024/5/input.txt", "utf-8");

const parts = input.split("\n\n");
const rules = parts[0]
  .split("\n")
  .map((line) => line.split("|").map((value) => parseInt(value)));
const books = parts[1]
  .split("\n")
  .map((line) => line.split(",").map((value) => parseInt(value)));

let sum = 0;
books.forEach((pages) => {
  console.log(pages);
  const valid = rules.every((rule) => {
    const firstIndex = pages.indexOf(rule[0]);
    const lastIndex = pages.indexOf(rule[1]);
    const notUsedRule = firstIndex === -1 || lastIndex === -1;
    const validRule = firstIndex < lastIndex;
    return notUsedRule || validRule;
  });
  if (valid) {
    const middle = pages[Math.round(pages.length / 2) - 1];
    console.log(middle);
    sum += middle;
  }
});

console.log(sum);
