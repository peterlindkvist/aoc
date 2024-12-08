import fs from "node:fs";

let input = fs.readFileSync("./2024/7/input.txt", "utf-8");

const rows = input.split("\n").map((row) => {
  console.log("rpw", row);
  const [total, numbers] = row.split(": ");
  return {
    total: parseInt(total),
    numbers: numbers.split(" ").map((n) => parseInt(n)),
  };
});

const longestSequence = rows.reduce((a, r) => Math.max(a, r.numbers.length), 0);

const operators = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => parseInt(`${a}${b}`),
];

const premutationsTotal = operators.length ** longestSequence;

const premutations = new Array(premutationsTotal)
  .fill((i: number) => i)
  .map((_, index) => {
    return new Array(longestSequence)
      .fill((i: number) => i)
      .map((_, j) => {
        const division = operators.length ** j;
        return Math.floor(index / division) % operators.length;
      });
  });

console.log(longestSequence, premutationsTotal);
console.log(premutations);

const sums = rows.map((row) => {
  const permutationsTotal = operators.length ** (row.numbers.length - 1);
  const permutationSlice = premutations
    .slice(0, permutationsTotal)
    .map((permugationRow) => permugationRow.slice(0, row.numbers.length - 1));
  const rowSum = permutationSlice.map((permutationRow, i) => {
    const sum = row.numbers.slice(1).reduce((acc, number, column) => {
      const operator = operators[permutationRow[column]];

      return operator(acc, number);
    }, row.numbers[0]);
    return sum;
  });
  return rowSum.includes(row.total) ? row.total : 0;
});

console.log(
  sums,
  sums.reduce((a, sum) => a + sum, 0)
);
