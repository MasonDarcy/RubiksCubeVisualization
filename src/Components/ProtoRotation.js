import "../styles/protorotation.css";
import { useState, useRef, useEffect } from "react";
import tools from "./helpers/util";
import colorUtils from "./helpers/colorHelper";
import perspectiveUtils from "./helpers/perspectiveTools";

import cubeModel from "./helpers/cubeModel";

const ProtoRotation = () => {
  const [topClassName, setTopClassName] = useState(null);
  const [middleClassName, setMiddleClassName] = useState(null);
  const [bottomClassName, setBottomClassName] = useState(null);
  const [model, setModel] = useState(cubeModel.createTopSlice());
  const [animating, setAnimating] = useState(false);
  const [rotation, setRotation] = useState("initialFloor");
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownRotation, setMouseDownRotation] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(null);
  const [targetSlice, setTargetSlice] = useState(null);
  const el = useRef(null);
  const plane = useRef(null);
  const firstRender = useRef(true);
  const xRef = useRef(null);
  const yRef = useRef(null);
  const targetRef = useRef(null);
  const calculatingRef = useRef(false);
  const [initialMouseYPos, setInitialMouseYPos] = useState(null);
  const [initialMouseXPos, setInitialMouseXPos] = useState(null);
  const [xRotation, setXRotation] = useState(-24);
  const [yRotation, setYRotation] = useState(-24);
  const [rotationToBe, setRotationToBe] = useState(null);

  const xPerspectiveRemap = (direction) => {
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

    return p1[Math.abs(directionIndex)];
  };

  const rotateModelAndRecolor = (sliceNum, rotationDirection) => {
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

  const dispatchRotateEvent = (targetSlice, rotationDirection) => {
    switch (targetSlice) {
      case "bottom":
        switch (rotationDirection) {
          case "c":
            setBottomClassName("protoShiftBottomC");
            break;
          case "cc":
            setBottomClassName("protoShiftBottomCC");
            break;
        }
        break;
      case "middle":
        switch (rotationDirection) {
          case "c":
            setMiddleClassName("protoShiftMiddleC");
            break;
          case "cc":
            setMiddleClassName("protoShiftMiddleCC");
            break;
        }
        break;
      case "top":
        switch (rotationDirection) {
          case "c":
            setTopClassName("protoShiftTopC");
            break;
          case "cc":
            setTopClassName("protoShiftTopCC");
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
    }, 1000);
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
  const dragstart = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      console.log("useEffect called");
      if (topClassName) {
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
        switch (rotationToBe) {
          case "initialFloor":
            dispatchRotateEvent(targetSlice, rotationDirection);
            break;
          case "rotatedFloor90Y":
            setRotation(rotationToBe);
            colorUtils.remapAllColors(model, el, "right");
            dispatchRotateEvent(targetSlice, rotationDirection);
            break;
          case "rotatedFloor90X":
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
    window.addEventListener("dragstart", dragstart);
    window.addEventListener("drop", drop);

    return () => {
      window.removeEventListener("mousemove", mousemoving);
      window.removeEventListener("dragstart", dragstart);
      window.removeEventListener("drop", drop);
    };
  });
  /*----------------------------------------------------------------------------------*/
  /*Model rotations------------------------------------------------------------.*/
  /*Shifts 90 degrees around the y-axis.*/
  function rotateModel90Y() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "left");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90Y");
    setModel(newModel);
  }

  function rotateModelNeg90Y(matrix) {
    let copy = JSON.parse(JSON.stringify(matrix));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "right");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    return newModel;
  }

  function rotateModel90X() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverseX(coords, "right");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90X");
    setModel(newModel);
  }

  function rotateModelNeg90X(matrix) {
    let copy = JSON.parse(JSON.stringify(matrix));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverseX(coords, "left");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    return newModel;
  }

  /*---------------------------------------------------------------------------.*/
  /*Initializes mousedown state.*/
  const initial = (e) => {
    console.log("initial");
    setMouseDown(true);
    e.stopPropagation();
  };

  /*Initializes mousedown state. Fires animation if not already animating.*/
  const shiftRelease = (e) => {
    console.log("shift release");
    if (!animating) {
      setMouseDown(false);
      if (xRef.current && yRef.current) {
        protoDirectionDetection(e.pageX, e.pageY);
      }
    }
    e.stopPropagation();
  };

  /*Initializes user rotation state.*/
  const initialRotation = (e) => {
    console.log("intialRotation rotation called");
    setMouseDownRotation(true);
    setInitialMouseYPos(e.pageX);
    setInitialMouseXPos(e.pageY);
  };

  /*Initializes user rotation state.*/
  const releaseRotation = (e) => {
    if (setMouseDownRotation) {
      console.log("release rotation called");
      setMouseDownRotation(false);
      setXRotation(xRotation + initialMouseXPos - e.pageY);
      setYRotation(yRotation + e.pageX - initialMouseYPos);
    }
  };

  const protoDirectionDetection = (x, y) => {
    setAnimating(true);
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
    console.log(`xRef: ${xRef.current}`);
    console.log(`yRef: ${yRef.current}`);
    let xChange = x - xRef.current;
    let yChange = y - yRef.current;
    console.log(`xChange: ${xChange}`);
    console.log(`yChange: ${yChange}`);
    let axis;
    Math.abs(xChange) >= Math.abs(yChange) ? (axis = "x") : (axis = "y");
    if (x == xRef.current && y == yRef.current) {
      return;
    } else {
      if (axis == "x") {
        if (xChange > 0) {
          animationDelegator(targetRef.current, "east");
        } else {
          animationDelegator(targetRef.current, "west");
        }
      } else {
        if (yChange > 0) {
          animationDelegator(targetRef.current, "south");
        } else {
          animationDelegator(targetRef.current, "north");
        }
      }

      // setCalculatingDirection(false);
      setTimeout(() => {
        calculatingRef.current = false;
        // setMouseDown(false);
        xRef.current = null;
        yRef.current = null;
        setAnimating(false);
      }, 1025);
      // }, 150);
    }
  };

  const mousemoving = (e) => {
    e.preventDefault();
    if (mouseDown) {
      if (!calculatingRef.current) {
        targetRef.current = e.target.id;
        // protoDirectionDetection(e.pageX, e.pageY);
        // setCalculatingDirection(true);
        xRef.current = e.pageX;
        yRef.current = e.pageY;
        calculatingRef.current = true;
      }
    } else if (mouseDownRotation) {
      let changeY = e.pageX - initialMouseYPos;
      let changeX = initialMouseXPos - e.pageY;
      plane.current.style.setProperty(`--x-rotation`, xRotation + changeX);
      plane.current.style.setProperty(`--y-rotation`, yRotation + changeY);
    }

    // xRef.current = e.pageX;
    // yRef.current = e.pageY;
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
    //  console.log(`degree: ${yRotation}`);
    let remappedDirection;
    if (xReverse) {
      remappedDirection = perspectiveUtils.xPerspectiveRemap(
        direction,
        xRotation
      );
    } else {
      remappedDirection = getPerspectiveDirection(direction, reverse);
    }

    //  console.log(`RemappedDirection: ${remappedDirection}`);

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
    //let remappedDirection = 0;
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
    <div>
      <div
        className="seen"
        ref={el}
        onMouseUp={
          mouseDown ? shiftRelease : mouseDownRotation ? releaseRotation : null
        }
        onMouseDown={initialRotation}
      >
        <div className={rotation} ref={plane}>
          <div className={`topHorizontalPlane ${topClassName}`}>
            <div></div>
            <div id="whiteSideOneOne" onMouseDown={initial}>
              <p>a</p>
            </div>
            <div></div>
            <div id="greenSideOneOne" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div id="redSideOneOne" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div id="whiteSideOneTwo" onMouseDown={initial}>
              <p>b</p>
            </div>
            <div></div>
            <div></div>
            <div id="redSideOneTwo" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div id="whiteSideOneThree" onMouseDown={initial}>
              <p>c</p>
            </div>
            <div id="blueSideOneOne" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div>
              {" "}
              <p>blue</p>
            </div>
            <div id="redSideOneThree" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="greenSideOneTwo" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div id="redSideTwoOne" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="anomalousYellowOneOne">
              <p>yellow?</p>
            </div>
            <div></div>
            <div id="redSideTwoTwo" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="blueSideOneTwo" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div id="redSideTwoThree" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div id="yellowSideOneOne" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div></div>
            <div id="greenSideOneThree" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div id="redSideThreeOne" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div id="yellowSideOneTwo" onMouseDown={initial}>
              <p>yellow?</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="redSideThreeTwo" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div onMouseDown={initial} id="yellowSideOneThree"></div>
            <div></div>
            <div id="blueSideOneThree" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div id="redSideThreeThree" onMouseDown={initial}>
              <p>red</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`middleHorizontalPlane ${middleClassName}`}>
            <div></div>
            <div id="whiteSideTwoOne" onMouseDown={initial}>
              <p>d</p>
            </div>
            <div></div>
            <div id="greenSideTwoOne" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="whiteSideTwoTwo" onMouseDown={initial}>
              <p>e</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="whiteSideTwoThree" onMouseDown={initial}>
              <p>f</p>
            </div>
            <div id="blueSideTwoOne" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="greenSideTwoTwo" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="blueSideTwoTwo" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="yellowSideTwoOne" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div></div>
            <div id="greenSideTwoThree" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div></div>
            <div id="yellowSideTwoTwo" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="yellowSideTwoThree" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div id="blueSideTwoThree" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`bottomHorizontalPlane ${bottomClassName}`}>
            <div></div>
            <div id="whiteSideThreeOne" onMouseDown={initial}>
              <p>g</p>
            </div>
            <div></div>
            <div id="greenSideThreeOne" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div id="orangeSideOneOne" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div id="whiteSideThreeTwo" onMouseDown={initial}>
              <p>h</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="orangeSideOneTwo" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div id="whiteSideThreeThree" onMouseDown={initial}>
              <p>i</p>
            </div>
            <div id="blueSideThreeOne" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div id="orangeSideOneThree" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="greenSideThreeTwo" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div id="orangeSideTwoOne" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="orangeSideTwoTwo" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div></div>
            <div id="blueSideThreeTwo" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div id="orangeSideTwoThree" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div id="yellowSideThreeOne" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div></div>
            <div id="greenSideThreeThree" onMouseDown={initial}>
              <p>green</p>
            </div>
            <div></div>
            <div id="orangeSideThreeOne" onMouseDown={initial}></div>
            <div id="yellowSideThreeTwo" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="orangeSideThreeTwo" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div id="yellowSideThreeThree" onMouseDown={initial}>
              <p>yellow</p>
            </div>
            <div></div>
            <div id="blueSideThreeThree" onMouseDown={initial}>
              <p>blue</p>
            </div>
            <div></div>
            <div></div>
            <div id="orangeSideThreeThree" onMouseDown={initial}>
              <p>orange</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtoRotation;
