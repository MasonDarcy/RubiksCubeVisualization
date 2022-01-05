import "../styles/style.css";
import { useState, useRef, useEffect } from "react";
import colorUtils from "./helpers/colorHelper";
import perspectiveUtils from "./helpers/perspectiveTools";
import cubeModel from "./helpers/cubeModel";

const RubixCube = () => {
  const [topClassName, setTopClassName] = useState(null);
  const [middleClassName, setMiddleClassName] = useState(null);
  const [bottomClassName, setBottomClassName] = useState(null);
  // const [model, setModel] = useState(cubeModel.createTopSlice());
  const [model, setModel] = useState(null);
  const animatingRef = useRef(false);
  const [rotation, setRotation] = useState("initialFloor");
  const [mouseDown, setMouseDown] = useState(false);
  const mouseUpTimeout = useRef(false);
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

  /*Triggers an animation, updates the model after the animation finishes.*/
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
      let copy = cubeModel.rotateModelAndRecolor(
        cubeModel.planeToNum(targetSlice),
        rotationDirection,
        model
      );
      switch (rotationToBe) {
        case "initialFloor":
          break;
        case "rotatedFloor90Y":
          copy = cubeModel.rotateModelNeg90(copy, "y", "right");
          break;
        case "rotatedFloor90X":
          copy = cubeModel.rotateModelNeg90(copy, "x", "left");
          break;
      }
      animatingRef.current = false;
      calculatingRef.current = false;
      console.log("Set Timeout called");
      xRef.current = null;
      yRef.current = null;
      setModel(copy);
    }, 1000);
  };

  /*When the model changes, repaints the cubes so its consistent with the new state.*/
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      //Color it here
      colorUtils.initializeCubeColors(el);
      let mod = cubeModel.paintModel();
      setModel(mod);
      //BLRRULBULUFBURULLFDFFRFBRDBDFDBDBURLUBRFLUFDFUDLLBRDDR
      console.log(mod);

      return;
    } else {
      console.log(`topClassName: ${topClassName}`);
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
  /*Sets up mousemove event listeners.--------------------------------------------------*/
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
  /*
  Two functions that rotate the model, and update the state
  These are assigned to a specific face of the rubik's cube to determine the animation.
   */
  function rotateModel90Y() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "left", "y");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90Y");
    setModel(newModel);
  }

  function rotateModel90X() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "right", "x");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90X");
    setModel(newModel);
  }

  /*---------------------------------------------------------------------------.*/
  /*Determines which direction the user is trying to rotate the cube.*/
  const computeDirection = (x, y) => {
    // setAnimating(true);
    animatingRef.current = true;
    console.log(`animating inside compute: ${animatingRef.current}`);
    console.log("computeDirection called");
    let xChange = x - xRef.current;
    let yChange = y - yRef.current;

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

      // setTimeout(() => {
      //   calculatingRef.current = false;
      //   console.log("Set Timeout called");
      //   xRef.current = null;
      //   yRef.current = null;
      //   animatingRef.current = false;
      // }, 1025);
    }
  };

  /*Event handlers----------------------------------------------------------*/
  const mousemoving = (e) => {
    e.preventDefault();
    if (mouseDown) {
      // console.log("Inside mousedown mousemoving");

      if (!calculatingRef.current) {
        targetRef.current = e.target.id;
        xRef.current = e.pageX;
        yRef.current = e.pageY;
        calculatingRef.current = true;
      }
    } else if (mouseDownRotation) {
      console.log("Inside mouseDownRotation");
      let changeY = e.pageX - initialMouseYPos;
      let changeX = initialMouseXPos - e.pageY;
      plane.current.style.setProperty(`--x-rotation`, xRotation + changeX);
      plane.current.style.setProperty(`--y-rotation`, yRotation + changeY);
    }
  };

  /*Initializes the state where a user is rotating the entire cube around to look at it.*/
  const initialRotation = (e) => {
    //  console.log("intialRotation rotation called");
    setMouseDownRotation(true);
    setInitialMouseYPos(e.pageX);
    setInitialMouseXPos(e.pageY);
  };

  /*Ends the user rotation state.*/
  const releaseRotation = (e) => {
    if (setMouseDownRotation) {
      // console.log("release rotation called");
      setMouseDownRotation(false);
      setXRotation(xRotation + initialMouseXPos - e.pageY);
      setYRotation(yRotation + e.pageX - initialMouseYPos);
    }
  };

  /*Initializes a state where the user is dragging and trying to rotate a slice .*/
  const initial = (e) => {
    if (!animatingRef.current) {
      setMouseDown(true);
    }
    e.stopPropagation();
  };

  /*Fires an animation on mouse-up.*/
  const shiftRelease = (e) => {
    if (!mouseUpTimeout.current) {
      console.log("shift release called");
      console.log(`animating: ${animatingRef.current}`);
      if (!animatingRef.current) {
        setMouseDown(false);
        if (xRef.current && yRef.current) {
          computeDirection(e.pageX, e.pageY);
        }
      }
      if (xRef.current) {
        mouseUpTimeout.current = true;
        setTimeout(() => {
          mouseUpTimeout.current = false;
          animatingRef.current = false;
          console.log("Release Mouse UP");
        }, 1000);
      }
    }
    //   }
    e.stopPropagation();
  };

  /*Basic default drag prevent callbacks.*/
  const dragstart = (e) => {
    e.preventDefault();
  };
  const drop = (e) => {
    e.preventDefault();
  };
  /*-------------------------------------------------------------------------*/
  const reverseDirection = (rotationDirection) => {
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
    let remappedDirection;
    if (xReverse) {
      remappedDirection = perspectiveUtils.xPerspectiveRemap(
        direction,
        xRotation
      );
    } else {
      remappedDirection = perspectiveUtils.getPerspectiveDirection(
        direction,
        yRotation,
        reverse
      );
    }

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
        setRotationDirection(reverseDirection(colorData.rotationOrder[0]));
        setTargetSlice(sliceTuple[0]);
        if (colorData.westFunc) {
          colorData.westFunc();
        } else {
          setRotationToBe("initialFloor");
          dispatchRotateEvent(
            sliceTuple[0],
            reverseDirection(colorData.rotationOrder[0])
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
        setRotationDirection(reverseDirection(colorData.rotationOrder[1]));
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
        className="scene"
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

export default RubixCube;
