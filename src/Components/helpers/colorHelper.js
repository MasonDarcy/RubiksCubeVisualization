let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];
let faces = [
  topFaceIndices,
  rightFaceIndices,
  frontFaceIndices,
  downFaceIndices,
  leftFaceIndices,
  backFaceIndices,
];
const initializeCubeColors = (el) => {
  let cubeEncoding = "BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR";

  let topFace = cubeEncoding.substring(0, 9); //BLRRULBUL
  let rightFace = cubeEncoding.substring(9, 18); //UFBURULLF
  let frontFace = cubeEncoding.substring(18, 27); //DFFRFBRDB
  let downFace = cubeEncoding.substring(27, 36); //DFDBDBURL
  let leftFace = cubeEncoding.substring(36, 45); // UBRFLUFDF
  let backFace = cubeEncoding.substring(45, 54); //UDLLBRDDR

  let colorStrings = [
    topFace,
    rightFace,
    frontFace,
    downFace,
    leftFace,
    backFace,
  ];

  for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
    for (let faceletIndex = 0; faceletIndex < 9; faceletIndex++) {
      let letter = colorStrings[faceIndex].charAt(faceletIndex);
      // console.log(letter);
      let color = colorMapper(letterToColorNum(letter));
      el.current.style.setProperty(
        `--color${faces[faceIndex][faceletIndex]}`,
        color
      );
      if (faceIndex == 3) {
        console.log(`letter: ${letter}`);

        console.log(`color: ${color}`);
        console.log(`--color${faces[faceIndex][faceletIndex]}`);
      }
    }
  }
};

const remapSliceColors = (sliceNum, model, el) => {
  for (let i = 0; i < 3; i++) {
    model[sliceNum][i].forEach((cube, cubeIndex) => {
      cube.forEach((side, sideIndex) => {
        let color = colorMapper(side.currentColor);
        el.current.style.setProperty(
          `--color${sliceNum * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`,
          color
        );
      });
    });
  }
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

const colorMapper = (colorNum) => {
  switch (colorNum) {
    case 0:
      return "#261c1b";
    case 1:
      return "#353a47";

    case 2:
      return "#F7C1BB";

    case 3:
      return "#885A5A";
    case 4:
      return "#84B082";

    case 5:
      return "#DC136C";

    case 6:
      return "orange";

    default:
      console.log("error");
      break;
  }
};

const remapAllColors = (model, el, direction) => {
  for (let p = 0; p < 3; p++) {
    for (let i = 0; i < 3; i++) {
      model[p][i].forEach((cube, cubeIndex) => {
        if (direction == "right") {
          rotateColors90Y(cube);
        } else {
          rotateColorsNeg90Y(cube);
        }
        cube.forEach((side, sideIndex) => {
          let color = colorMapper(side.currentColor);

          el.current.style.setProperty(
            `--color${p * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`,
            color
          );
        });
      });
    }
  }
};

const remapAllColorsX = (model, el, direction) => {
  for (let p = 0; p < 3; p++) {
    for (let i = 0; i < 3; i++) {
      model[p][i].forEach((cube, cubeIndex) => {
        if (direction == "right") {
          rotateColors90X(cube);
        } else {
          rotateColorsNeg90X(cube);
        }
        cube.forEach((side, sideIndex) => {
          let color = colorMapper(side.currentColor);

          el.current.style.setProperty(
            `--color${p * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`,
            color
          );
        });
      });
    }
  }
};

function rotateColors90Y(cube) {
  let copy = JSON.parse(JSON.stringify(cube));

  //Rotating all the colors LEFT
  cube[4].currentColor = copy[2].currentColor;
  cube[2].currentColor = copy[5].currentColor;
  cube[3].currentColor = copy[4].currentColor;
  cube[5].currentColor = copy[3].currentColor;
}

function rotateColorsNeg90Y(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  //Rotating all the colors right

  //Top becomes the left side
  cube[4].currentColor = copy[3].currentColor;

  //Right side becoems the top color
  cube[2].currentColor = copy[4].currentColor;

  //Left side becomes the bottom color
  cube[3].currentColor = copy[5].currentColor;

  //bottom color becomes the right side
  cube[5].currentColor = copy[2].currentColor;
}

function rotateColorsNeg90X(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  //Rotating all the colors backwards

  //Front becomes the top
  cube[0].currentColor = copy[4].currentColor;

  //Top becomes the back
  cube[4].currentColor = copy[1].currentColor;

  //Back becomes the bottom
  cube[1].currentColor = copy[5].currentColor;

  //bottom color becomes the back
  cube[5].currentColor = copy[0].currentColor;
}

function rotateColors90X(cube) {
  let copy = JSON.parse(JSON.stringify(cube));
  //Rotating all the colors forwards

  //Top becomes the front
  cube[4].currentColor = copy[0].currentColor;

  //Front becomes the bottom
  cube[0].currentColor = copy[5].currentColor;

  //Bottom  becomes the back
  cube[5].currentColor = copy[1].currentColor;

  //Back color becomes the top
  cube[1].currentColor = copy[4].currentColor;
}

const colorUtils = {
  remapSliceColors,
  remapAllColors,
  remapAllColorsX,
  initializeCubeColors,
};

export default colorUtils;
