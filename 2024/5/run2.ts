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

function isPagesValid(pages: number[]) {
  return rules.every((rule) => {
    const firstIndex = pages.indexOf(rule[0]);
    const lastIndex = pages.indexOf(rule[1]);
    const notUsedRule = firstIndex === -1 || lastIndex === -1;
    const validRule = firstIndex < lastIndex;
    return notUsedRule || validRule;
  });
}

function reorderPages(pages: number[]) {
  rules.forEach((rule) => {
    const firstIndex = pages.indexOf(rule[0]);
    const lastIndex = pages.indexOf(rule[1]);
    const useRule = firstIndex !== -1 && lastIndex !== -1;
    const invalidRule = firstIndex > lastIndex;

    if (useRule && invalidRule) {
      const temp = pages[firstIndex];
      pages[firstIndex] = pages[lastIndex];
      pages[lastIndex] = temp;
    }
  });
  return pages;
}

books.forEach((pages) => {
  const beforePages = [...pages];
  const valid = isPagesValid(pages);
  if (!valid) {
    // reorder pages at max the pages length times
    pages = pages.reduce((acc, page) => {
      return reorderPages(pages);
    }, pages);

    const middle = pages[Math.round(pages.length / 2) - 1];

    console.log(beforePages, "-->", pages, isPagesValid(pages), middle);

    sum += middle;
  }
});

console.log(sum);
