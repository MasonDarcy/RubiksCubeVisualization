const Cube = require("cubejs");

// const randomCube = Cube.random();
// const solved = new Cube();
// console.log(randomCube.asString());
// console.log(solved.asString());

// Cube.initSolver();
// console.log(randomCube.solve());
//UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB
//Top face indices (4, 6) (starts at 5)
//5, 11, 17, 23, 29, 35, 41, 47, 53
//Right face indices (15, 18)
//15, 33, 51, 69, 87. .etc
//Front faces (irregular pattern)
//37, 43, 49, 91, 97, 103, 145, 151, 157
//Down face (114, 6)
//114, 120, 126, 132 . .  etc
//Left face (4, 18)
//4, 22, 40, 58 . .
//Back face (2) irregular
//2, 8, 14, 56, 62, 68, 110, 116, 122
//UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB

let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];

// const initializeRandomCube = (model) => {
//   // let cubeEncoding = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";
//   const cubeEncoding = Cube.random().asString();
//   console.log(cubeEncoding);
//   //BLRRULBUL-UFBURULLF-DFFRFBRDB-DFDBDBURL-UBRFLUFDF-UDLLBRDDR
//   //First six digits of the string are the top faces
//   let cubeEncoding = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";

//   let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL
//   let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF
//   let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
//   let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
//   let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF
//   let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR

//   console.log(topFace);
//   console.log(rightFace);
//   console.log(frontFace);
//   console.log(downFace);
//   console.log(leftFace);
//   console.log(backFace);

//   //Given a random string, remap the following CSS color variables. Then use the algo to solve.
// };
//initializeRandomCube();

const test = Cube.fromString(
  "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR"
);
Cube.initSolver();
console.log(test.solve());
//This is inline with my own encoding

let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL
let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF
let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF
let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR
