const xPerspectiveRemap = (direction, xRotation) => {
  let degree = xRotation % 360;

  if (
    (degree >= -90 && degree <= 90) ||
    (degree >= 270 && degree <= 360) ||
    (degree > -360 && degree < -270)
  ) {
    console.log("Not upside down");
    return direction;
  } else {
    console.log("Is upside down");

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

const perspectiveUtils = {
  xPerspectiveRemap,
};

export default perspectiveUtils;
