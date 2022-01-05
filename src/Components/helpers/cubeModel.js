import { slice } from "lodash";
import tools from "./util";

const createTopSlice = () => {
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

const letterToColorNum = (faceChar) => {
  switch (faceChar) {
    case "F":
      return 1;
    case "B":
      return 2;
    case "R":
      return 3;
    case "L":
      return 4;
    case "U":
      return 5;
    case "D":
      return 6;
  }
};

//F B R L U D N(black)
// cubeString = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";

const buildNakedModel = () => {
  let model = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];
  /*Top slice--------------------------------------------------- */
  for (let sliceIndex = 0; sliceIndex < 3; sliceIndex++) {
    //Slices
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let cubeIndex = 0; cubeIndex < 3; cubeIndex++) {
        model[sliceIndex][rowIndex][cubeIndex] = [
          { currentColor: 0 },
          { currentColor: 0 },
          { currentColor: 0 },
          { currentColor: 0 },
          { currentColor: 0 },
          { currentColor: 0 },
        ];
      }
    }
  }
  return model;
};

const paintModel = () => {
  let model = buildNakedModel();
  let cubeEncoding = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";

  let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL
  let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF
  let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
  let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
  let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF
  let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR

  let faceColors = [
    frontFace,
    backFace,
    rightFace,
    leftFace,
    topFace,
    downFace,
  ];

  let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
  let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
  let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
  let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
  let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
  let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];

  let faces = [
    frontFaceIndices,
    backFaceIndices,
    rightFaceIndices,
    leftFaceIndices,
    topFaceIndices,
    downFaceIndices,
  ];

  for (let i = 0; i < faces.length; i++) {
    for (let cubeFace = 0; cubeFace < 9; cubeFace++) {
      let x, y, z, s;
      let num = faces[i][cubeFace];
      num -= 1;
      //slice
      z = Math.floor((num / 162) * 3);
      if (z == 3) {
        z = 2;
      }
      //row
      y = Math.floor(((num - z * 54) / 54) * 3);
      if (y == 3) {
        y = 2;
      }
      //cube
      x = Math.floor(((num - z * 54 - y * 18) / 18) * 3);
      if (x == 3) {
        x = 2;
      }

      //side
      //?
      s = num - z * 54 - y * 18 - x * 6;
      if (s == 6) {
        s = 5;
      }
      // console.log(`num: ${num}`);
      // console.log(`Char: ${faceColors[i][cubeFace]}`);
      // console.log(`z: ${z}`);
      // console.log(`y: ${y}`);
      // console.log(`x: ${x}`);
      // console.log(`s: ${s}`);
      model[z][y][x][s].currentColor = letterToColorNum(
        faceColors[i][cubeFace]
      );
    }
  }

  return model;
};

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

const determineMatrix = (direction, axis) => {
  switch (axis) {
    case "x":
      switch (direction) {
        case "left":
          return rotationLeftMatrixX;
        case "right":
          return rotationRightMatrixX;
      }
      break;
    case "y":
      switch (direction) {
        case "left":
          return rotationLeftMatrix;
        case "right":
          return rotationRightMatrix;
      }
      break;
  }
};

const rotateUniverse = (universe, direction, axis) => {
  const rotatedSystem = [];
  let matrix = determineMatrix(direction, axis);

  for (let i = 0; i < universe.length; i++) {
    let newCoord = [];
    let val = 0;
    for (let q = 0; q <= 2; q++) {
      for (let c = 0; c <= 2; c++) {
        val += universe[i][c] * matrix[q][c];
      }
      newCoord.push(val);
      val = 0;
    }

    rotatedSystem.push(newCoord);
  }
  return rotatedSystem;
};

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

  return copy;
};

const planeToNum = (targetSlice) => {
  switch (targetSlice) {
    case "top":
      return 0;
    case "middle":
      return 1;
    case "bottom":
      return 2;
  }
};

const rotateModelAndRecolor = (sliceNum, rotationDirection, model) => {
  let rotationFunction;
  let swapped;

  if (rotationDirection == "c") {
    rotationFunction = tools.rotateColors90C;

    swapped = tools.rotate90(model[sliceNum]);
  } else {
    rotationFunction = tools.rotateColors90CC;
    swapped = tools.rotate90CC(model[sliceNum]);
  }

  for (let i = 0; i < 3; i++) {
    swapped[i].forEach((cube) => {
      rotationFunction(cube);
    });
  }

  let copy = JSON.parse(JSON.stringify(model));
  copy[sliceNum] = swapped;
  return copy;
};

function rotateModelNeg90(matrix, axis, direction) {
  let copy = JSON.parse(JSON.stringify(matrix));
  let coords = modelToCoordinateArray();
  let shiftedUniverse = rotateUniverse(coords, direction, axis);
  let newModel = updateModel(shiftedUniverse, copy);
  return newModel;
}

const cubeModel = {
  createTopSlice,
  modelToCoordinateArray,
  translateCoord,
  updateModel,
  planeToNum,
  rotateModelAndRecolor,
  rotateUniverse,
  rotateModelNeg90,
  paintModel,
};

export default cubeModel;
