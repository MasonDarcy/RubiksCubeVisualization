const createTopSlice = () => {
  /* 
  front
  back
  right
  left
  top
  bottom
  */

  let model = [];
  let topSlice = [];
  let middleSlice = [];
  let bottomSlice = [];
  let topBack = [];
  let topMiddle = [];
  let topFront = [];
  let middleBack = [];
  let middleMiddle = [];
  let middleFront = [];
  let bottomBack = [];
  let bottomMiddle = [];
  let bottomFront = [];
  /*Top slice--------------------------------------------------- */
  let cube1 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  let cube2 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  let cube3 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  topBack.push(cube1);
  topBack.push(cube2);
  topBack.push(cube3);
  let cube4 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  let cube5 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];

  let cube6 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  topMiddle.push(cube4);
  topMiddle.push(cube5);
  topMiddle.push(cube6);
  let cube7 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  let cube8 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  let cube9 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 5 },
    { currentColor: 0 },
  ];
  topFront.push(cube7);
  topFront.push(cube8);
  topFront.push(cube9);
  topSlice.push(topBack);
  topSlice.push(topMiddle);
  topSlice.push(topFront);

  /*Middle slice--------------------------------------------------- */
  let cube10 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube11 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube12 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  middleBack.push(cube10);
  middleBack.push(cube11);
  middleBack.push(cube12);

  let cube13 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube14 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube15 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  middleMiddle.push(cube13);
  middleMiddle.push(cube14);
  middleMiddle.push(cube15);

  let cube16 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube17 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  let cube18 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
  ];
  middleFront.push(cube16);
  middleFront.push(cube17);
  middleFront.push(cube18);
  middleSlice.push(middleBack);
  middleSlice.push(middleMiddle);
  middleSlice.push(middleFront);

  /*Bottom slice--------------------------------------------------- */
  let cube19 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube20 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube21 = [
    { currentColor: 0 },
    { currentColor: 2 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  bottomBack.push(cube19);
  bottomBack.push(cube20);
  bottomBack.push(cube21);

  let cube22 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube23 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube24 = [
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  bottomMiddle.push(cube22);
  bottomMiddle.push(cube23);
  bottomMiddle.push(cube24);

  let cube25 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 4 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube26 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  let cube27 = [
    { currentColor: 1 },
    { currentColor: 0 },
    { currentColor: 3 },
    { currentColor: 0 },
    { currentColor: 0 },
    { currentColor: 6 },
  ];
  bottomFront.push(cube25);
  bottomFront.push(cube26);
  bottomFront.push(cube27);
  bottomSlice.push(bottomBack);
  bottomSlice.push(bottomMiddle);
  bottomSlice.push(bottomFront);
  /*--------------------------------------------------------------- */
  model.push(topSlice);
  model.push(middleSlice);
  model.push(bottomSlice);
  return model;
};

// 1 black,
/*
1, front - black
2, back - green
3, left side - blue
4, right side - black
5, top - red
6, bottom - black

1, front - black
2, back - green
3, left side - black
4, right side - yellow
5, top - red
6, bottom - black

*/

const modelToCoordinateArray = () => {
  let coordArray = [];

  for (let z = 1; z >= -1; z--) {
    for (let y = 1; y >= -1; y--) {
      for (let x = -1; x <= 1; x++) {
        coordArray.push([x, y, z]);
      }
    }
  }

  return coordArray;
};

const mapCoord = (target) => {
  let output;

  switch (target) {
    case -1:
      output = 2;
      break;
    case 0:
      output = 1;
      break;
    case 1:
      output = 0;
      break;
  }

  return output;
};

const translateCoord = (coord) => {
  let x, y, z;

  x = coord[0] + 1;
  y = mapCoord(coord[1]);
  z = mapCoord(coord[2]);

  return [x, y, z];
  //[0, 2, 0]
};

//Need a function that rotates

//I'll be iterating through here
//[1, -1, -1]

const rotationLeftMatrix = [
  [0, 0, -1],
  [0, 1, 0],
  [1, 0, 0],
];

const rotationRightMatrix = [
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0],
];

const rotationLeftMatrixX = [
  [1, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
];

const rotationRightMatrixX = [
  [1, 0, 0],
  [0, 0, 1],
  [0, -1, 0],
];

const rotateUniverseX = (universe, direction) => {
  const rotatedSystem = [];

  for (let i = 0; i < universe.length; i++) {
    let newCoord = [];
    let val = 0;
    for (let q = 0; q <= 2; q++) {
      for (let c = 0; c <= 2; c++) {
        val +=
          universe[i][c] *
          (direction == "right"
            ? rotationRightMatrixX[q][c]
            : rotationLeftMatrixX[q][c]);
      }
      newCoord.push(val);
      val = 0;
    }

    rotatedSystem.push(newCoord);
  }
  return rotatedSystem;
};

const rotateUniverse = (universe, direction) => {
  const rotatedSystem = [];

  for (let i = 0; i < universe.length; i++) {
    let newCoord = [];
    let val = 0;
    for (let q = 0; q <= 2; q++) {
      for (let c = 0; c <= 2; c++) {
        val +=
          universe[i][c] *
          (direction == "right"
            ? rotationRightMatrix[q][c]
            : rotationLeftMatrix[q][c]);
      }
      newCoord.push(val);
      val = 0;
    }

    rotatedSystem.push(newCoord);
  }
  return rotatedSystem;
};

//Now, we are rotating it -90 degrees visually
//but we want to preserve the colors so we rotate it back 90 degrees
//Use rotate univers to get the coords
//Create a new empty cube model
//Iterate through all the co-ordinates
//At each coordinate, map it back to array co-ords, and then put those in place

const updateModel = (coords, model) => {
  let copy = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];

  for (let z = 0; z < 3; z++) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        let coordIndex = z * 9 + y * 3 + x;
        let mappedCoords = translateCoord(coords[coordIndex]);
        copy[mappedCoords[2]][mappedCoords[1]][mappedCoords[0]] =
          model[z][y][x];
      }
    }
  }
  console.log(copy);
  return copy;
};
//so then.. the New thing, at new[0][2][0] becomes what the model is at model[0][0][0]
const cubeModel = {
  createTopSlice,
  modelToCoordinateArray,
  translateCoord,
  rotateUniverse,
  rotateUniverseX,
  updateModel,
};

export default cubeModel;
