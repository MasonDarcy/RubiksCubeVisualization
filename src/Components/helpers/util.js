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

//given a cube, mutate its colors 90 degrees
function rotateColors90(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  cube[0].currentColor = copy[2].currentColor;
  cube[1].currentColor = copy[3].currentColor;
  cube[2].currentColor = copy[1].currentColor;
  cube[3].currentColor = copy[0].currentColor;
}

const tools = {
  rotate90,
  rotateColors90,
};

export default tools;
