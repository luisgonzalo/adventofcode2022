export const x = "";

const file = await Deno.readTextFile("./input2.txt");
const lines = file.split("\r\n");

function myToolScore(tool: "X" | "Y" | "Z") {
  if (tool === "X") {
    return 1;
  } else if (tool === "Y") {
    return 2;
  } else {
    return 3;
  }
}

// strategy is A -> Y, B -> X and C -> X
function calculateScore(input: string[]) {
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    const splitted = input[i].split(" ");
    const opponent = splitted[0];
    const me = splitted[1];

    score += myToolScore(me);
    if (opponent === "A") {
      // opponent rock
      if (me === "X") {
        score += 3;
      } else if (me === "Y") {
        score += 6;
      } else {
        score += 0;
      }
    } else if (opponent === "B") {
      // opponent paper
      if (me === "X") {
        score += 0;
      } else if (me === "Y") {
        score += 3;
      } else {
        score += 6;
      }
    } else if (opponent === "C") {
      // opponent scissors
      if (me === "X") {
        score += 6;
      } else if (me === "Y") {
        score += 0;
      } else {
        score += 3;
      }
    }
  }
  return score;
}

console.log("score: ", calculateScore(lines));

function calculateScore2(input: string[]) {
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    const splitted = input[i].split(" ");
    const opponent = splitted[0];
    const me = splitted[1];

    if (opponent === "A") {
      // opponent rock
      if (me === "X") {
        // I need to lose, so I choose Z (scissors)
        score += myToolScore("Z");
      } else if (me === "Y") {
        // I need a draw so I choose X (rock)
        score += myToolScore("X") + 3;
      } else {
        // I need to win so I choose Y (paper)
        score += myToolScore("Y") + 6;
      }
    } else if (opponent === "B") {
      // opponent paper
      if (me === "X") {
        // I need to lose, so I choose X (rock)
        score += myToolScore("X");
      } else if (me === "Y") {
        // I need a draw so I choose Y (paper)
        score += myToolScore("Y") + 3;
      } else {
        // I need to win so I choose Z (scissors)
        score += myToolScore("Z") + 6;
      }
    } else if (opponent === "C") {
      // opponent scissors
      if (me === "X") {
        // I need to lose, so I choose Y (paper)
        score += myToolScore("Y");
      } else if (me === "Y") {
        // I need a draw so I choose Z (scissors)
        score += myToolScore("Z") + 3;
      } else {
        // I need to win so I choose X (rock)
        score += myToolScore("X") + 6;
      }
    }
  }
  return score;
}

console.log("score2: ", calculateScore2(lines));
