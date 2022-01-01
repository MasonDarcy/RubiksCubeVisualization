import "../styles/protorotation.css";
import { useState, useRef, useEffect } from "react";
import tools from "./helpers/util";
import colorUtils from "./helpers/colorHelper";
import cubeModel from "./helpers/cubeModel";
const { v4: uuidv4 } = require("uuid");

const ProtoRotation = () => {
  const [topClassName, setTopClassName] = useState(null);
  const [middleClassName, setMiddleClassName] = useState(null);
  const [bottomClassName, setBottomClassName] = useState(null);
  const [model, setModel] = useState(cubeModel.createTopSlice());
  const [liminalModel, setLiminalModel] = useState(null);

  const [rotation, setRotation] = useState("initialFloor");
  const [oldX, setOldX] = useState(0);
  const [oldY, setOldY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownRotation, setMouseDownRotation] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(null);
  const [direction, setDirection] = useState(null);
  const [targetSlice, setTargetSlice] = useState(null);
  const el = useRef(null);
  const plane = useRef(null);
  const firstRender = useRef(true);
  const [lastSelected, setLastSelected] = useState(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [initialMouseYPos, setInitialMouseYPos] = useState(null);
  const [initialMouseXPos, setInitialMouseXPos] = useState(null);
  const [xRotation, setXRotation] = useState(-24);
  const [yRotation, setYRotation] = useState(-24);
  const [rotationToBe, setRotationToBe] = useState(null);

  const isXUpsideDown = () => {
    let degree = xRotation % 360;
    console.log(degree);
    if (
      (degree >= -90 && degree <= 90) ||
      (degree >= 270 && degree <= 360) ||
      (degree > -360 && degree < -270)
    ) {
      return "up";
    } else {
      return "down";
    }
  };

  const xPerspectiveRemap = (direction) => {
    let degree = xRotation % 360;

    // if (direction == "west" || direction == "east") {
    //   return direction;
    // } else {
    if (
      (degree >= -90 && degree <= 90) ||
      (degree >= 270 && degree <= 360) ||
      (degree > -360 && degree < -270)
    ) {
      // if (direction == "north" || direction == "south") {
      //   return direction;
      // }
      return direction;
    } else {
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

  const getPerspectiveDirection = (direction, reverse) => {
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
      console.log("P1");
    }

    if (degree < 315 && degree >= 225) {
      console.log("P2");
      reverse
        ? (directionIndex = (directionIndex + 7) % 4)
        : (directionIndex = (directionIndex + 1) % 4);
    }

    if (degree < 225 && degree > 135) {
      console.log("P3");
      reverse
        ? (directionIndex = (directionIndex + 6) % 4)
        : (directionIndex = (directionIndex + 2) % 4);
    }

    if (degree > 45 && degree <= 135) {
      console.log("P4");
      reverse
        ? (directionIndex = (directionIndex + 5) % 4)
        : (directionIndex = (directionIndex + 3) % 4);
    }

    let p1 = ["north", "west", "south", "east"];
    //  console.log(`Margeee: ${Math.abs(directionIndex)}`);

    return p1[Math.abs(directionIndex)];
  };

  const getPerspectiveDirectionOrange = (direction) => {
    let degree = yRotation % 360;
    if (degree < 0) {
      degree = 360 + degree;
    }

    let directionIndex = 0;

    switch (direction) {
      case "north":
        directionIndex = 0;
        break;
      case "east":
        directionIndex = 1;
        break;
      case "south":
        directionIndex = 2;
        break;
      case "west":
        directionIndex = 3;
        break;
    }

    if (degree < 45 || degree > 315) {
      console.log("P1");
    }

    if (degree < 315 && degree >= 225) {
      console.log("P2");
      directionIndex = (directionIndex + 1) % 4;
    }

    if (degree < 225 && degree > 135) {
      console.log("P3");
      directionIndex = (directionIndex + 2) % 4;
    }

    if (degree > 45 && degree <= 135) {
      console.log("P4");
      directionIndex = (directionIndex + 3) % 4;
    }

    let p1 = ["north", "east", "south", "west"];

    console.log(`Direction index: ${directionIndex}`);

    return p1[Math.abs(directionIndex)];
  };

  const rotateModelAndRecolor = (sliceNum, rotationDirection) => {
    let rotationFunction;
    let swapped;

    if (rotationDirection == "c") {
      rotationFunction = tools.rotateColors90C;
      console.log(`sliceNum: ${sliceNum}`);

      swapped = tools.rotate90(model[sliceNum]);
    } else {
      rotationFunction = tools.rotateColors90CC;
      //  console.log(`sliceNum: ${sliceNum}`);
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
    //setModel(copy);
  };

  const dispatchRotateEvent = (targetSlice, rotationDirection) => {
    console.log(`targetSlice: ${targetSlice}`);
    // console.log(rotationDirection);
    switch (targetSlice) {
      case "bottom":
        switch (rotationDirection) {
          case "c":
            setBottomClassName("protoShiftBottomC");
            console.log("DRE: C");
            break;
          case "cc":
            setBottomClassName("protoShiftBottomCC");
            console.log("DRE: CC");
            break;
        }
        break;
      case "middle":
        switch (rotationDirection) {
          case "c":
            setMiddleClassName("protoShiftMiddleC");
            console.log("DRE: C");
            break;
          case "cc":
            setMiddleClassName("protoShiftMiddleCC");
            console.log("DRE: CC");
            break;
        }
        break;
      case "top":
        console.log(rotationDirection);
        switch (rotationDirection) {
          case "c":
            setTopClassName("protoShiftTopC");
            console.log("DRE: C");
            break;
          case "cc":
            setTopClassName("protoShiftTopCC");
            console.log("DRE: CC");
            break;
        }
        break;
    }

    setTimeout(() => {
      //need slice num
      let copy = rotateModelAndRecolor(
        planeToNum(targetSlice),
        rotationDirection
      );
      //This rotation needs to be conditionally performed.
      //
      // console.log(`rotationToBe: ${rotationToBe}`);

      switch (rotationToBe) {
        case "initialFloor":
          break;
        case "rotatedFloor90Y":
          copy = rotateModelNeg90Y(copy);
          break;
        case "rotatedFloor90X":
          copy = rotateModelNeg90X(copy);
          break;
      }

      setModel(copy);
      //  console.log("rotate and recolor");
    }, 5000);
  };

  function planeToNum(targetSlice) {
    switch (targetSlice) {
      case "top":
        return 0;
      case "middle":
        return 1;
      case "bottom":
        return 2;
    }
  }

  /*Based on the current animation that was called, remaps colors and sets to null.
Otherwise, we changed the rotation axis, then it's responsible for triggering an animation.
*/
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      if (topClassName) {
        console.log(`Rotation to be: ${rotationToBe}`);
        switch (rotationToBe) {
          case "initialFloor":
            colorUtils.remapSliceColors(0, model, el);
            break;
          case "rotatedFloor90Y":
            colorUtils.remapAllColors(model, el, "left");
            break;
          case "rotatedFloor90X":
            colorUtils.remapAllColorsX(model, el, "left");
            break;
        }
        setRotationToBe("initialFloor");
        setRotation("initialFloor");
        setTopClassName(null);
      } else if (middleClassName) {
        switch (rotationToBe) {
          case "initialFloor":
            colorUtils.remapSliceColors(1, model, el);
            break;
          case "rotatedFloor90Y":
            colorUtils.remapAllColors(model, el, "left");
            break;
          case "rotatedFloor90X":
            colorUtils.remapAllColorsX(model, el, "left");
            break;
        }
        setRotationToBe("initialFloor");
        setRotation("initialFloor");
        setMiddleClassName(null);
      } else if (bottomClassName) {
        //  console.log(rotationToBe);
        switch (rotationToBe) {
          case "initialFloor":
            colorUtils.remapSliceColors(2, model, el);
            break;
          case "rotatedFloor90Y":
            colorUtils.remapAllColors(model, el, "left");
            break;
          case "rotatedFloor90X":
            colorUtils.remapAllColorsX(model, el, "left");
            break;
        }

        setRotationToBe("initialFloor");
        setRotation("initialFloor");
        setBottomClassName(null);
      } else {
        //   console.log(`rotation to be: ${rotationToBe}`);
        console.log("Use effect else called.");
        switch (rotationToBe) {
          case "initialFloor":
            // console.log(model);
            // colorUtils.remapSliceColors(2, model, el);
            // colorUtils.remapAllColorsX(model, el, "left");
            //    setRotation(rotationToBe);
            dispatchRotateEvent(targetSlice, rotationDirection);
            break;
          case "rotatedFloor90Y":
            setRotation(rotationToBe);
            colorUtils.remapAllColors(model, el, "right");
            dispatchRotateEvent(targetSlice, rotationDirection);
            break;
          case "rotatedFloor90X":
            //    console.log("First useEffect call");
            setRotation(rotationToBe);
            colorUtils.remapAllColorsX(model, el, "right");
            dispatchRotateEvent(targetSlice, rotationDirection);
            break;
        }
      }
    }
  }, [model]);
  /*Sets up mousemove event listener.--------------------------------------------------*/
  useEffect(() => {
    window.addEventListener("mousemove", mousemoving);

    return () => {
      window.removeEventListener("mousemove", mousemoving);
    };
  });
  /*----------------------------------------------------------------------------------*/
  /*Model rotations------------------------------------------------------------.*/
  /*Shifts 90 degrees around the y-axis.*/
  function rotateModel90Y() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    //console.log(coords);

    //"left" here controls direction I think
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "left");
    // console.log(shiftedUniverse);
    //Produces a matrix, each "point" has the co-ordinates of where it should go
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);

    setRotationToBe("rotatedFloor90Y");
    setModel(newModel);
  }

  function rotateModelNeg90Y(matrix) {
    let copy = JSON.parse(JSON.stringify(matrix));
    let coords = cubeModel.modelToCoordinateArray();
    //"left" here controls direction I think
    //  console.log(coords);
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "right");
    // console.log(shiftedUniverse);
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    // console.log(model);
    // console.log(newModel);
    //setRotationToBe("initialFloor");
    //setModel(newModel);
    return newModel;
  }

  function rotateModel90X() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    //"left" here controls direction I think
    // console.log(coords);
    let shiftedUniverse = cubeModel.rotateUniverseX(coords, "right");
    //Left pushes it away from the user
    //  console.log(shiftedUniverse);
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    // console.log(model);
    // console.log(newModel);
    setRotationToBe("rotatedFloor90X");
    setModel(newModel);
    // console.log("RotateModel90X called");
  }

  function rotateModelNeg90X(matrix) {
    let copy = JSON.parse(JSON.stringify(matrix));
    let coords = cubeModel.modelToCoordinateArray();
    //"left" here controls direction I think
    // console.log(coords);
    let shiftedUniverse = cubeModel.rotateUniverseX(coords, "left");
    // console.log(shiftedUniverse);
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    // console.log(model);
    // console.log(newModel);
    //setRotationToBe("initialFloor");
    return newModel;
    //setModel(newModel);
  }

  /*---------------------------------------------------------------------------.*/
  /*Initializes mousedown state.*/
  const initial = (e) => {
    setMouseDown(true);
  };

  /*Initializes user rotation state.*/
  const initialRotation = (e) => {
    if (e.currentTarget === e.target) {
      setMouseDownRotation(true);
      setInitialMouseYPos(e.pageX);
      setInitialMouseXPos(e.pageY);
    }
  };

  /*Initializes user rotation state.*/
  const releaseRotation = (e) => {
    if (e.currentTarget === e.target) {
      if (setMouseDownRotation) {
        setMouseDownRotation(false);

        setXRotation(xRotation + initialMouseXPos - e.pageY);
        setYRotation(yRotation + e.pageX - initialMouseYPos);
        console.log(`isUpsideDown: ${isXUpsideDown()}`);

        //  console.log(yRotation % 360);
        //  getPerspectiveDirection();
      }
    }
  };

  const mousemoving = (e) => {
    e.preventDefault();
    if (mouseDown) {
      if (e.pageX > oldX && e.pageY == oldY) {
        console.log("Mousemove: East");
        setDirection("East");
        animationDelegator(e.target.id, "east");
        setMouseDown(false);
      } else if (e.pageX == oldX && e.pageY > oldY) {
        setDirection("Mousemove: South");
        console.log("South");
        animationDelegator(e.target.id, "south");
        setMouseDown(false);
      } else if (e.pageX == oldX && e.pageY < oldY) {
        console.log("Mousemove: North");
        setDirection("North");
        animationDelegator(e.target.id, "north");
        setMouseDown(false);
      } else if (e.pageX < oldX && e.pageY == oldY) {
        console.log("Mousemove: West");
        setDirection("West");
        animationDelegator(e.target.id, "west");
        setMouseDown(false);
      }
    }

    if (mouseDownRotation) {
      let changeY = e.pageX - initialMouseYPos;
      let changeX = initialMouseXPos - e.pageY;
      plane.current.style.setProperty(`--x-rotation`, xRotation + changeX);
      plane.current.style.setProperty(`--y-rotation`, yRotation + changeY);
    }

    setOldX(e.pageX);
    setOldY(e.pageY);
  };

  const testHelper = (rotationDirection) => {
    if (rotationDirection == "c") {
      return "cc";
    } else {
      return "c";
    }
  };

  const redData = {
    northFunc: rotateModel90Y,
    westFunc: rotateModel90X,
    rotationOrder: ["cc", "c"],
  };

  const orangeData = {
    northFunc: rotateModel90Y,
    westFunc: rotateModel90X,
    rotationOrder: ["c", "c"],
  };

  const whiteData = {
    northFunc: rotateModel90Y,
    westFunc: null,
    rotationOrder: ["c", "cc"],
  };

  const greenData = {
    northFunc: rotateModel90X,
    westFunc: null,
    rotationOrder: ["c", "c"],
  };

  const blueData = {
    northFunc: rotateModel90X,
    westFunc: null,
    rotationOrder: ["c", "cc"],
  };

  const yellowData = {
    northFunc: rotateModel90Y,
    westFunc: null,
    rotationOrder: ["c", "c"],
  };

  const animate = (direction, sliceTuple, colorData, reverse, xReverse) => {
    console.log(`degree: ${yRotation}`);
    let remappedDirection;
    if (xReverse) {
      remappedDirection = xPerspectiveRemap(direction);
    } else {
      remappedDirection = getPerspectiveDirection(direction, reverse);
    }

    console.log(`RemappedDirection: ${remappedDirection}`);

    switch (remappedDirection) {
      case "west":
        setRotationDirection(colorData.rotationOrder[0]);
        setTargetSlice(sliceTuple[0]);
        if (colorData.westFunc) {
          colorData.westFunc();
        } else {
          setRotationToBe("initialFloor");
          dispatchRotateEvent(sliceTuple[0], colorData.rotationOrder[0]);
        }
        break;
      case "east":
        setRotationDirection(testHelper(colorData.rotationOrder[0]));
        setTargetSlice(sliceTuple[0]);
        if (colorData.westFunc) {
          colorData.westFunc();
        } else {
          setRotationToBe("initialFloor");
          dispatchRotateEvent(
            sliceTuple[0],
            testHelper(colorData.rotationOrder[0])
          );
        }
        break;
      case "north":
        setRotationDirection(colorData.rotationOrder[1]);
        setTargetSlice(sliceTuple[1]);
        if (colorData.northFunc) {
          colorData.northFunc();
        } else {
          setRotationToBe("initialFloor");
        }
        break;
      case "south":
        setRotationDirection(testHelper(colorData.rotationOrder[1]));
        setTargetSlice(sliceTuple[1]);
        if (colorData.northFunc) {
          colorData.northFunc();
        } else {
          setRotationToBe("initialFloor");
        }
        break;
    }
  };

  const animationDelegator = (id, direction) => {
    /*Logic here to determine direction as a function of viewer perspective.*/
    let remappedDirection = 0;
    let sliceTuple;
    switch (id) {
      case "redSideOneOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideOneTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideOneThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideThreeOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideThreeTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, redData);
        break;
      case "redSideThreeThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, redData);
        break;
      case "orangeSideOneOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideOneTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideOneThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideThreeOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideThreeTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "orangeSideThreeThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, orangeData, true);
        break;
      case "whiteSideOneOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideOneTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideOneThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideThreeOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideThreeTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "whiteSideThreeThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, whiteData, false, true);
        break;
      case "greenSideOneOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideOneTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideOneThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideThreeOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideThreeTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "greenSideThreeThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, greenData, false, true);
        break;
      case "blueSideOneOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideOneTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideOneThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideThreeOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideThreeTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "blueSideThreeThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, blueData, false, true);
        break;
      case "yellowSideOneOne":
        sliceTuple = ["top", "bottom"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideOneTwo":
        sliceTuple = ["top", "middle"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideOneThree":
        sliceTuple = ["top", "top"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideTwoOne":
        sliceTuple = ["middle", "bottom"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideTwoTwo":
        sliceTuple = ["middle", "middle"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideTwoThree":
        sliceTuple = ["middle", "top"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideThreeOne":
        sliceTuple = ["bottom", "bottom"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideThreeTwo":
        sliceTuple = ["bottom", "middle"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
      case "yellowSideThreeThree":
        sliceTuple = ["bottom", "top"];
        animate(direction, sliceTuple, yellowData, false, true);
        break;
    }
  };

  return (
    <div
      className="seen"
      ref={el}
      onMouseUp={releaseRotation}
      onMouseDown={initialRotation}
    >
      <div className={rotation} ref={plane}>
        <div
          onClick={() => {
            setLastSelected(1);
          }}
          className={`topHorizontalPlane ${topClassName}`}
        >
          <div>1t</div>
          <div id="whiteSideOneOne" onMouseDown={initial}>
            2t
          </div>
          <div>3t</div>
          <div id="greenSideOneOne" onMouseDown={initial}>
            4t
          </div>
          <div id="redSideOneOne" onMouseDown={initial}>
            {" "}
            5t
          </div>
          <div>6t</div>
          <div>7t</div>
          <div id="whiteSideOneTwo" onMouseDown={initial}>
            8t
          </div>
          <div>9t</div>
          <div>10t</div>
          <div id="redSideOneTwo" onMouseDown={initial}>
            11t{" "}
          </div>
          <div>12t</div>
          <div>13t</div>
          <div id="whiteSideOneThree" onMouseDown={initial}>
            14t
          </div>
          <div id="blueSideOneOne" onMouseDown={initial}>
            15t
          </div>
          <div>16t</div>
          <div id="redSideOneThree" onMouseDown={initial}>
            17t
          </div>
          <div>18t</div>
          <div>19t</div>
          <div>20t</div>
          <div>21t</div>
          <div id="greenSideOneTwo" onMouseDown={initial}>
            22t
          </div>
          <div id="redSideTwoOne" onMouseDown={initial}>
            23t
          </div>
          <div>24t</div>
          <div>25t</div>
          <div>26t</div>
          <div id="yellowSideOneOne" onMouseDown={initial}>
            27t
          </div>
          <div>28t</div>
          <div id="redSideTwoTwo" onMouseDown={initial}>
            29t
          </div>
          <div>30t</div>
          <div>31t</div>
          <div>32t</div>
          <div id="blueSideOneTwo" onMouseDown={initial}>
            33t{" "}
          </div>
          <div>34t</div>
          <div id="redSideTwoThree" onMouseDown={initial}>
            35t
          </div>
          <div>36t</div>
          <div id="yellowSideOneOne" onMouseDown={initial}>
            37t
          </div>
          <div>38t</div>
          <div>39t</div>
          <div id="greenSideOneThree" onMouseDown={initial}>
            40t
          </div>
          <div id="redSideThreeOne" onMouseDown={initial}>
            41t
          </div>
          <div>42t</div>
          <div id="yellowSideOneTwo" onMouseDown={initial}>
            43t
          </div>
          <div>44t</div>
          <div>45t</div>
          <div>46t</div>
          <div id="redSideThreeTwo" onMouseDown={initial}>
            47t
          </div>
          <div>48t</div>
          <div onMouseDown={initial} id="yellowSideOneThree">
            49t
          </div>
          <div>50t</div>
          <div id="blueSideOneThree" onMouseDown={initial}>
            51t
          </div>
          <div>52t</div>
          <div id="redSideThreeThree" onMouseDown={initial}>
            53t
          </div>
          <div>54t</div>
          <div>55t</div>
          <div>56t</div>
          <div>57t</div>
          <div>58t</div>
          <div>59t</div>
          <div>60t</div>
        </div>
        <div
          className={`middleHorizontalPlane ${middleClassName}`}
          onClick={() => {
            // rotateEvent("protoShiftMiddle");
            setLastSelected(2);
          }}
        >
          <div>1</div>
          <div id="whiteSideTwoOne" onMouseDown={initial}>
            2
          </div>
          <div>3</div>
          <div id="greenSideTwoOne" onMouseDown={initial}>
            4
          </div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div id="whiteSideTwoTwo" onMouseDown={initial}>
            8
          </div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div id="whiteSideTwoThree" onMouseDown={initial}>
            14
          </div>
          <div id="blueSideTwoOne" onMouseDown={initial}>
            15
          </div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div id="greenSideTwoTwo" onMouseDown={initial}>
            22
          </div>
          <div>23</div>
          <div>24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div>30</div>
          <div>31</div>
          <div>32</div>
          <div id="blueSideTwoTwo" onMouseDown={initial}>
            33
          </div>
          <div>34</div>
          <div>35</div>
          <div>36</div>
          <div id="yellowSideTwoOne" onMouseDown={initial}>
            37
          </div>
          <div>38</div>
          <div>39</div>
          <div id="greenSideTwoThree" onMouseDown={initial}>
            40
          </div>
          <div>41</div>
          <div>42</div>
          <div id="yellowSideTwoTwo" onMouseDown={initial}>
            43
          </div>
          <div>44</div>
          <div>45</div>
          <div>46</div>
          <div>47</div>
          <div>48</div>
          <div id="yellowSideTwoThree" onMouseDown={initial}>
            49
          </div>
          <div>50</div>
          <div id="blueSideTwoThree" onMouseDown={initial}>
            51
          </div>
          <div>52</div>
          <div>53</div>
          <div>54</div>
          <div>55</div>
          <div>56</div>
          <div>57</div>
          <div>58</div>
          <div>59</div>
          <div>60</div>
        </div>
        <div
          className={`bottomHorizontalPlane ${bottomClassName}`}
          onClick={() => {
            //    rotateEvent("protoShiftBottom");
            setLastSelected(3);
          }}
        >
          <div>1a</div>
          <div id="whiteSideThreeOne" onMouseDown={initial}>
            2a
          </div>
          <div>3a</div>
          <div id="greenSideThreeOne" onMouseDown={initial}>
            4a
          </div>
          <div>5a</div>
          <div id="orangeSideOneOne" onMouseDown={initial}>
            6a
          </div>
          <div>7a</div>
          <div id="whiteSideThreeTwo" onMouseDown={initial}>
            8a
          </div>
          <div>9a</div>
          <div>10a</div>
          <div>11a</div>
          <div id="orangeSideOneTwo" onMouseDown={initial}>
            12a
          </div>
          <div>13a</div>
          <div id="whiteSideThreeThree" onMouseDown={initial}>
            14a
          </div>
          <div id="blueSideThreeOne" onMouseDown={initial}>
            15a
          </div>
          <div>16a</div>
          <div>17a</div>
          <div id="orangeSideOneThree" onMouseDown={initial}>
            18a
          </div>
          <div>19a</div>
          <div>20a</div>
          <div>21a</div>
          <div id="greenSideThreeTwo" onMouseDown={initial}>
            22a
          </div>
          <div>23a</div>
          <div id="orangeSideTwoOne" onMouseDown={initial}>
            24a
          </div>
          <div>25a</div>
          <div>26a</div>
          <div>27a</div>
          <div>28a</div>
          <div>29a</div>
          <div id="orangeSideTwoTwo" onMouseDown={initial}>
            30a
          </div>
          <div>31a</div>
          <div>32a</div>
          <div id="blueSideThreeTwo" onMouseDown={initial}>
            33a
          </div>
          <div>34a</div>
          <div>35a</div>
          <div id="orangeSideTwoThree" onMouseDown={initial}>
            36a
          </div>
          <div id="yellowSideThreeOne" onMouseDown={initial}>
            37a
          </div>
          <div>38a</div>
          <div>39a</div>
          <div id="greenSideThreeThree" onMouseDown={initial}>
            40a
          </div>
          <div>41a</div>
          <div id="orangeSideThreeOne" onMouseDown={initial}>
            42a
          </div>
          <div id="yellowSideThreeTwo" onMouseDown={initial}>
            43a
          </div>
          <div>44a</div>
          <div>45a</div>
          <div>46a</div>
          <div>47a</div>
          <div id="orangeSideThreeTwo" onMouseDown={initial}>
            48a
          </div>
          <div id="yellowSideThreeThree" onMouseDown={initial}>
            49a
          </div>
          <div>50a</div>
          <div id="blueSideThreeThree" onMouseDown={initial}>
            51a
          </div>
          <div>52a</div>
          <div>53a</div>
          <div id="orangeSideThreeThree" onMouseDown={initial}>
            54a
          </div>
          <div>55a</div>
          <div>56a</div>
          <div>57a</div>
          <div>58a</div>
          <div>59a</div>
          <div>60a</div>
        </div>
      </div>
    </div>
  );
};

export default ProtoRotation;
