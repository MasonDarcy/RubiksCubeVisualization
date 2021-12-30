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

const colorMapper = (colorNum) => {
  switch (colorNum) {
    case 0:
      return "grey";
    case 1:
      return "yellow";

    case 2:
      return "white";

    case 3:
      return "blue";
    case 4:
      return "green";

    case 5:
      return "red";

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
};

export default colorUtils;
