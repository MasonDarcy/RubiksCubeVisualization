let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];

let modelFaces = [
  frontFaceIndices,
  backFaceIndices,
  rightFaceIndices,
  leftFaceIndices,
  topFaceIndices,
  downFaceIndices,
];

let colorFaces = [
  topFaceIndices,
  rightFaceIndices,
  frontFaceIndices,
  downFaceIndices,
  leftFaceIndices,
  backFaceIndices,
];

const cube1 = [
  null,
  "whiteSideOneOne",
  null,
  "greenSideOneOne",
  "redSideOneOne",
  null,
];

const cube2 = [null, "whiteSideOneTwo", null, null, "redSideOneTwo", null];
const cube3 = [
  null,
  "whiteSideOneThree",
  "blueSideOneOne",
  null,
  "redSideOneThree",
  null,
];
const cube4 = [null, null, null, "greenSideOneTwo", "redSideTwoOne", null];
const cube5 = [null, null, null, null, "redSideTwoTwo", null];
const cube6 = [null, null, "blueSideOneTwo", null, "redSideTwoThree", null];
const cube7 = [
  "yellowSideOneOne",
  null,
  null,
  "greenSideOneThree",
  "redSideThreeOne",
  null,
];
const cube8 = ["yellowSideOneTwo", null, null, null, "redSideThreeTwo", null];
const cube9 = [
  "yellowSideOneThree",
  null,
  "blueSideOneThree",
  null,
  "redSideThreeThree",
  null,
];

const cube10 = [null, "whiteSideTwoOne", null, "greenSideTwoOne", null, null];

const cube11 = [null, "whiteSideTwoTwo", null, null, null, null];

const cube12 = [null, "whiteSideTwoThree", "blueSideTwoOne", null, null, null];

const cube13 = [null, null, null, "greenSideTwoTwo", null, null];

const cube14 = [null, null, null, null, null, null];
const cube15 = [null, null, "blueSideTwoTwo", null, null, null];

const cube16 = [
  "yellowSideTwoOne",
  null,
  null,
  "greenSideTwoThree",
  null,
  null,
];

const cube17 = ["yellowSideTwoTwo", null, null, null, null, null];
const cube18 = [
  "yellowSideTwoThree",
  null,
  "blueSideTwoThree",
  null,
  null,
  null,
];

const cube19 = [
  null,
  "whiteSideThreeOne",
  null,
  "greenSideThreeOne",
  null,
  "orangeSideOneOne",
];

const cube20 = [
  null,
  "whiteSideThreeTwo",
  null,
  null,
  null,
  "orangeSideOneTwo",
];

const cube21 = [
  null,
  "whiteSideThreeThree",
  "blueSideThreeOne",
  null,
  null,
  "orangeSideOneThree",
];

const cube22 = [
  null,
  null,
  null,
  "greenSideThreeTwo",
  null,
  "orangeSideTwoOne",
];

const cube23 = [null, null, null, null, null, "orangeSideTwoTwo"];

const cube24 = [
  null,
  null,
  "blueSideThreeTwo",
  null,
  null,
  "orangeSideTwoThree",
];

const cube25 = [
  "yellowSideThreeOne",
  null,
  null,
  "greenSideThreeThree",
  null,
  "orangeSideThreeOne",
];

const cube26 = [
  "yellowSideThreeTwo",
  null,
  null,
  null,
  null,
  "orangeSideThreeTwo",
];

const cube27 = [
  "yellowSideThreeThree",
  null,
  "blueSideThreeThree",
  null,
  null,
  "orangeSideThreeThree",
];

const jsxCubeData = [
  cube1,
  cube2,
  cube3,
  cube4,
  cube5,
  cube6,
  cube7,
  cube8,
  cube9,
  cube10,
  cube11,
  cube12,
  cube13,
  cube14,
  cube15,
  cube16,
  cube17,
  cube18,
  cube19,
  cube20,
  cube21,
  cube22,
  cube23,
  cube24,
  cube25,
  cube26,
  cube27,
];

const faceData = {
  modelFaces,
  colorFaces,
  jsxCubeData,
};

export default faceData;
