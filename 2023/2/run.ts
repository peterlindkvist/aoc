import fs from "node:fs";

let input = fs.readFileSync("./2023/2/inputTest.txt", "utf-8");

const rows = input.split("\n");

let sum = 0;
rows.forEach((row) => {
  const [idPart, rulesPart] = row.split(":");
  const id = parseInt(idPart.replace("Game ", ""));
  const rulePart = rulesPart.split(/[;,]/);
  let ok = true;
  let min: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const rules = rulePart.map((oneRule) => {
    const [limitString, colorString] = oneRule.trim().split(" ");
    const color = colorString.trim();
    const limit = parseInt(limitString.trim());
    // 12 red cubes, 13 green cubes, and 14 blue cubes?
    if (limit > min[color]) {
      min[color] = limit;
    }
    // if (color === "red" && limit > 12) {
    //   ok = false;
    // }
    // if (color === "green" && limit > 13) {
    //   ok = false;
    // }
    // if (color === "blue" && limit > 14) {
    //   ok = false;
    // }
    return {
      color,
      limit,
      min,
    };
  });

  const value = min.red * min.green * min.blue;
  if (ok) {
    sum += value;
  }
  console.log("row", id, rulePart, rules, min, value);
});

console.log(sum);
