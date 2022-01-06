const Cube = require("cubejs");

// const randomCube = Cube.random();
const solved = new Cube();
solved.move("U");

// console.log(randomCube.asString());
// console.log(solved.asString());

Cube.initSolver();
console.log(typeof solved.solve());

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

Cube.initSolver();
let tester = solved.solve();
console.log(tester);
console.log(parseMoveString(tester));
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

// const test = Cube.fromString(
//   "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR"
// );
// Cube.initSolver();
// console.log(test.solve());
//This is inline with my own encoding

// let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL
// let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF
// let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
// let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
// let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF
// let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR

// const transmuteString = () => {
//   //Right face needs to undergo this transform
//   //UFBURULLF // --> bfu, uru, fll Check
//   //back face
//   //UDLLBRDDR --> LDU, RBL, RDD
//   //bottom face
//   // DFDBDBURL --> (try just reversing the whole thing)
//   //123456789
//   //  LRUBDBDFD
//   let cubeEncoding = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";
//   console.log(cubeEncoding.length);

//   let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF // --> bfu, uru, fll
//   let reverseSegment1 = rightFace.substring(0, 3).split("").reverse().join("");
//   let reverseSegment2 = rightFace.substring(3, 6).split("").reverse().join("");
//   let reverseSegment3 = rightFace.substring(6, 9).split("").reverse().join("");
//   let rightAmalgam = reverseSegment1 + reverseSegment2 + reverseSegment3;
//   cubeEncoding = replaceRange(cubeEncoding, 9, 18, rightAmalgam);
//   console.log(cubeEncoding.length);

//   let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR // -->LDU, RBL, RDD
//   console.log(backFace);
//   let reverseSegment4 = backFace.substring(0, 3).split("").reverse().join("");
//   console.log(reverseSegment4);
//   let reverseSegment5 = backFace.substring(3, 6).split("").reverse().join("");
//   let reverseSegment6 = backFace.substring(6, 9).split("").reverse().join("");

//   let leftAmalgam = reverseSegment4 + reverseSegment5 + reverseSegment6;
//   cubeEncoding = replaceRange(cubeEncoding, 45, 54, leftAmalgam);
//   console.log(leftAmalgam);
//   console.log(cubeEncoding.length);

//   //DFDBDBURL --> (try just reversing the whole thing)
//   let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
//   let strArr = downFace.split("");
//   strArr.reverse();
//   let reversed = strArr.join("");
//   cubeEncoding = replaceRange(cubeEncoding, 27, 36, reversed);

//   console.log(cubeEncoding);
// };

// function replaceRange(s, start, end, substitute) {
//   return s.substring(0, start) + substitute + s.substring(end);
// }

// transmuteString();
