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

// let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
// let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
// let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
// let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
// let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
// let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];
// let faces = [
//   topFaceIndices,
//   rightFaceIndices,
//   frontFaceIndices,
//   downFaceIndices,
//   leftFaceIndices,
//   backFaceIndices,
// ];

const faceData = {
  modelFaces,
  colorFaces,
};

export default faceData;
