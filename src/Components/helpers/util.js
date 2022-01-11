function rotate90(matrix) {
  const output = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let i = 0; i < matrix.length; i++) {
    for (let k = 0; k < matrix[i].length; k++) {
      output[k][2 - i] = matrix[i][k];
    }
  }
  let copy = JSON.parse(JSON.stringify(output));
  return copy;
}

function rotate90CC(matrix) {
  const output = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let i = 0; i < matrix.length; i++) {
    for (let k = 0; k < matrix[i].length; k++) {
      output[i][k] = matrix[k][2 - i];
    }
  }
  let copy = JSON.parse(JSON.stringify(output));
  return copy;
}

//given a cube, mutate its colors 90 degrees
function rotateColors90C(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  cube[0].currentColor = copy[2].currentColor;
  cube[1].currentColor = copy[3].currentColor;
  cube[2].currentColor = copy[1].currentColor;
  cube[3].currentColor = copy[0].currentColor;
}

function rotateColors90CC(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  cube[2].currentColor = copy[0].currentColor;
  cube[0].currentColor = copy[3].currentColor;
  cube[3].currentColor = copy[1].currentColor;
  cube[1].currentColor = copy[2].currentColor;
}

function rotateColors90Y(cube) {
  let copy = JSON.parse(JSON.stringify(cube));

  cube[4].currentColor = copy[2].currentColor;
  cube[2].currentColor = copy[5].currentColor;
  cube[3].currentColor = copy[4].currentColor;
  cube[5].currentColor = copy[3].currentColor;
}

const parseMoveString = (moveString) => {
  let replacementArr = [
    ["U2", "U U"],
    ["D2", "D D"],
    ["F2", "F F"],
    ["B2", "B B"],
    ["R2", "R R"],
    ["L2", "L L"],
  ];

  let result = moveString;
  for (let i = 0; i < replacementArr.length; i++) {
    result = result.replaceAll(replacementArr[i][0], replacementArr[i][1]);
  }
  return result;
};

const reverseDirection = (rotationDirection) => {
  if (rotationDirection == "c") {
    return "cc";
  } else {
    return "c";
  }
};

const tools = {
  rotate90,
  rotate90CC,
  rotateColors90C,
  rotateColors90CC,
  rotateColors90Y,
  parseMoveString,
  reverseDirection,
};

export default tools;
