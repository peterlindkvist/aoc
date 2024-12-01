import fs from "node:fs";

let input = fs.readFileSync("./2023/1/input.txt", "utf-8");

function replaceNumbers(row: string): string {
  return row
    .replaceAll("one", "one1one")
    .replaceAll("two", "two2two")
    .replaceAll("three", "three3three")
    .replaceAll("four", "four4four")
    .replaceAll("five", "five5five")
    .replaceAll("six", "six6six")
    .replaceAll("seven", "seven7seven")
    .replaceAll("eight", "eight8eight")
    .replaceAll("nine", "nine9nine");
}

const rows = input.split("\n");

let sum = 0;
rows.forEach((row) => {
  const replaced = replaceNumbers(row);
  const chars = replaced.match(/[0-9]/g);
  const value = parseInt((chars!.at(0) ?? "") + (chars!.at(-1) ?? ""));
  sum += value;
});

console.log(sum);
