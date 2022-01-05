const xPerspectiveRemap = (direction, xRotation) => {
  let degree = xRotation % 360;

  if (
    (degree >= -90 && degree <= 90) ||
    (degree >= 270 && degree <= 360) ||
    (degree > -360 && degree < -270)
  ) {
    //console.log("Not upside down");
    return direction;
  } else {
    // console.log("Is upside down");

    if (direction == "south") {
      return "north";
    }
    if (direction == "north") {
      return "south";
    }
    if (direction == "east") {
      return "west";
    }
    if (direction == "west") {
      return "east";
    }
  }
};

const getPerspectiveDirection = (direction, yRotation, reverse) => {
  let degree = yRotation % 360;
  if (degree < 0) {
    degree = 360 + degree;
  }

  let directionIndex = 0;

  switch (direction) {
    case "north":
      directionIndex = 0;
      break;
    case "west":
      directionIndex = 1;
      break;
    case "south":
      directionIndex = 2;
      break;
    case "east":
      directionIndex = 3;
      break;
  }

  if (degree < 45 || degree > 315) {
  }

  if (degree < 315 && degree >= 225) {
    //    console.log("P2");
    reverse
      ? (directionIndex = (directionIndex + 7) % 4)
      : (directionIndex = (directionIndex + 1) % 4);
  }

  if (degree < 225 && degree > 135) {
    //    console.log("P3");
    reverse
      ? (directionIndex = (directionIndex + 6) % 4)
      : (directionIndex = (directionIndex + 2) % 4);
  }

  if (degree > 45 && degree <= 135) {
    //   console.log("P4");
    reverse
      ? (directionIndex = (directionIndex + 5) % 4)
      : (directionIndex = (directionIndex + 3) % 4);
  }

  let p1 = ["north", "west", "south", "east"];

  return p1[Math.abs(directionIndex)];
};

const perspectiveUtils = {
  xPerspectiveRemap,
  getPerspectiveDirection,
};

export default perspectiveUtils;
