export const x = "";

const file = await Deno.readTextFile("./input3.txt");
const lines = file.split("\r\n");

function findRepeatedItem(rucksack: string) {
  const compartiment1 = rucksack.slice(0, rucksack.length / 2);
  const compartiment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

  for (let i = 0; i < compartiment1.length; i++) {
    const item = compartiment1[i];
    if (compartiment2.includes(item)) {
      return item;
    }
  }

  return null;
}

function calcPriority(item: string) {
  if (item >= "a" && item <= "z") {
    return item.charCodeAt(0) - 96;
  } else {
    return item.charCodeAt(0) - 38;
  }
}

function calcTotalPriority(rucksacks: string[]) {
  let totalPriority = 0;
  for (let i = 0; i < rucksacks.length; i++) {
    const repeatedItem = findRepeatedItem(rucksacks[i]);
    if (repeatedItem) {
      totalPriority += calcPriority(repeatedItem);
    }
  }
  return totalPriority;
}

// console.log("total priority: ", calcTotalPriority(lines));

function findCommonItem(
  rucksack1: string,
  rucksack2: string,
  rucksack3: string
) {
  for (let i = 0; i < rucksack1.length; i++) {
    const item = rucksack1[i];
    if (rucksack2.includes(item) && rucksack3.includes(item)) {
      return item;
    }
  }

  return null;
}

function calcTotalPriority2(rucksacks: string[]) {
  let totalPriority = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const commonItem = findCommonItem(
      rucksacks[i],
      rucksacks[i + 1],
      rucksacks[i + 2]
    );
    if (commonItem) {
      totalPriority += calcPriority(commonItem);
    }
  }
  return totalPriority;
}

console.log("total priority 2: ", calcTotalPriority2(lines));
