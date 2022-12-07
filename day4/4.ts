export const x = "";

const file = await Deno.readTextFile("./input4.txt");
const lines = file.split("\r\n");

function oneContainsTheOther(range1: string, range2: string) {
  const splitted1 = range1.split("-");
  const splitted2 = range2.split("-");
  const min1 = parseInt(splitted1[0]);
  const max1 = parseInt(splitted1[1]);
  const min2 = parseInt(splitted2[0]);
  const max2 = parseInt(splitted2[1]);

  console.log(min1, "-", max1, ",", min2, "-", max2);
  if (min1 >= min2 && max1 <= max2) {
    return true;
  } else if (min2 >= min1 && max2 <= max1) {
    return true;
  } else {
    return false;
  }
}

function countContainedRanges(ranges: string[]) {
  let count = 0;

  for (let i = 0; i < ranges.length; i++) {
    const splittedRanges = ranges[i].split(",");
    if (oneContainsTheOther(splittedRanges[0], splittedRanges[1])) {
      count++;
    }
  }
  return count;
}

// console.log("count: ", countContainedRanges(lines));

function rangesOverlap(range1: string, range2: string) {
  const splitted1 = range1.split("-");
  const splitted2 = range2.split("-");
  const min1 = parseInt(splitted1[0]);
  const max1 = parseInt(splitted1[1]);
  const min2 = parseInt(splitted2[0]);
  const max2 = parseInt(splitted2[1]);

  if (min1 > max2 || max1 < min2) {
    return false;
  } else {
    return true;
  }
}

function countOverlappingRanges(ranges: string[]) {
  let count = 0;

  for (let i = 0; i < ranges.length; i++) {
    const splittedRanges = ranges[i].split(",");
    if (rangesOverlap(splittedRanges[0], splittedRanges[1])) {
      count++;
    }
  }
  return count;
}

console.log("count 2: ", countOverlappingRanges(lines));
