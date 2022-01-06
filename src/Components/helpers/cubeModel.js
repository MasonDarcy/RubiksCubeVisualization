import tools from "./util";
import colorUtils from "./colorHelper";
import faceData from "./faceData";

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

const paintModel = (colorString) => {
  let model = buildNakedModel();
  // let initial = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";
  // let cubeEncoding = colorUtils.transmuteString(
  //   "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR"
  // );
  let cubeEncoding = colorUtils.transmuteString(colorString);

  let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL //good
  let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF // --> bfu, uru, fll

  let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
  let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
  let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF //good
  let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR // reverse

  let faceColors = [
    frontFace,
    backFace,
    rightFace,
    leftFace,
    topFace,
    downFace,
  ];

  for (let i = 0; i < faceData.modelFaces.length; i++) {
    for (let cubeFace = 0; cubeFace < 9; cubeFace++) {
      let x, y, z, s;
      let num = faceData.modelFaces[i][cubeFace];
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
      s = num - z * 54 - y * 18 - x * 6;
      if (s == 6) {
        s = 5;
      }
      model[z][y][x][s].currentColor = colorUtils.letterToColorNum(
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
