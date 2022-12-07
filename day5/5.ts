export const x = "";

const file = await Deno.readTextFile("./input5.txt");
const lines = file.split("\r\n");

function buildStack(s: string) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
  }
  return stack;
}

function buildStacks(s1: string, s2: string, s3: string) {
  const stack1 = buildStack(s1);
  const stack2 = buildStack(s2);
  const stack3 = buildStack(s3);
  return [stack1, stack2, stack3];
}

function buildMove(s: string) {
  const splitted = s.split(" ");
  const amount = parseInt(splitted[1]);
  const from = parseInt(splitted[3]) - 1;
  const to = parseInt(splitted[5]) - 1;
  return [amount, from, to];
}

function processMove(stacks: string[][], move: number[], sameOrder: boolean) {
  const [amount, from, to] = move;
  const stack1 = stacks[from];
  const stack2 = stacks[to];
  if (!sameOrder) {
    for (let i = 0; i < amount; i++) {
      const crate = stack1.pop();
      if (crate) {
        stack2.push(crate);
      }
    }
  } else {
    let destination: string[] = [];
    for (let i = 0; i < amount; i++) {
      const crate = stack1.pop();
      if (crate) {
        destination = [crate, ...destination];
      }
    }
    stacks[to] = [...stack2, ...destination];
  }
}

function processLines(lines: string[], sameOrder: boolean) {
  let index = 0;
  const noOfStacks = (lines[0].length + 1) / 4;
  const stacks = new Array(noOfStacks);

  function getInitialStacks(noOfStacks: number, lines: string[]) {
    while (lines[index].slice(0, 3) !== " 1 ") {
      for (let i = 0; i < noOfStacks; i++) {
        const item = lines[index][i * 4 + 1];
        if (item !== " ") {
          if (stacks[i]) {
            stacks[i] = [item, ...stacks[i]];
          } else {
            stacks[i] = [item];
          }
        }
      }

      index++;
    }
  }

  getInitialStacks(noOfStacks, lines);

  for (let i = index + 2; i < lines.length; i++) {
    const move = buildMove(lines[i]);
    processMove(stacks, move, sameOrder);
  }

  let stackTops = "";
  for (let i = 0; i < stacks.length; i++) {
    stackTops += stacks[i][stacks[i].length - 1];
  }
  return stackTops;
}

console.log(processLines(lines, false));

console.log(processLines(lines, true));
