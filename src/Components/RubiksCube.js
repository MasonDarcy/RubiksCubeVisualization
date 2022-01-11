import "../styles/style.css";
import { useState, useRef, useEffect } from "react";
/*Helpers---------------------------------------*/
import colorUtils from "./helpers/colorHelper";
import faceData from "./helpers/faceData";
import perspectiveUtils from "./helpers/perspectiveTools";
import tools from "./helpers/util";
/*Components----------------------------------*/
import cubeModel from "./helpers/cubeModel";
import SolveButton from "./SolveButton";
import RandomizeButton from "./RandomizeButton";
import SingleCube from "./SingleCube";
/*--------------------------------------------*/

const Cube = require("cubejs");

const RubiksCube = () => {
  const [topClassName, setTopClassName] = useState(null);
  const [middleClassName, setMiddleClassName] = useState(null);
  const [bottomClassName, setBottomClassName] = useState(null);
  const [model, setModel] = useState(null);
  const modelRef = useRef(model);
  let cubeRef = useRef(Cube.random());
  const animatingRef = useRef(false);
  const solvingRef = useRef(false);
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
  const randomizedRef = useRef(false);
  const [initialMouseYPos, setInitialMouseYPos] = useState(null);
  const [initialMouseXPos, setInitialMouseXPos] = useState(null);
  const [xRotation, setXRotation] = useState(-24);
  const [yRotation, setYRotation] = useState(-24);
  const [rotationToBe, setRotationToBe] = useState(null);
  const check = useRef(false);
  const disable = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const animationSpeed = 800;
  const time = useRef(null);
  /*Triggers an animation, updates the model after the animation finishes.*/
  const dispatchRotateEvent = (targetSlice, rotationDirection, model) => {
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
      xRef.current = null;
      yRef.current = null;
      setModel(copy);
      modelRef.current = copy;
    }, animationSpeed);
  };

  /*When the model changes, repaints the cubes so its consistent with the new state.*/
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      let cubeStringEncoding = cubeRef.current.asString();
      colorUtils.initializeCubeColors(el, cubeStringEncoding);
      let mod = cubeModel.paintModel(cubeStringEncoding);
      setModel(mod);
      modelRef.current = mod;
      setTimeout(() => {
        Cube.initSolver();
        setLoaded(true);
      }, 200);
      return;
    } else {
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
            if (!randomizedRef.current) {
              dispatchRotateEvent(
                targetSlice,
                rotationDirection,
                modelRef.current
              );
              randomizedRef.current = false;
            }
            break;
          case "rotatedFloor90Y":
            setRotation(rotationToBe);
            colorUtils.remapAllColors(model, el, "right");
            dispatchRotateEvent(
              targetSlice,
              rotationDirection,
              modelRef.current
            );
            break;
          case "rotatedFloor90X":
            setRotation(rotationToBe);
            colorUtils.remapAllColorsX(model, el, "right");
            dispatchRotateEvent(
              targetSlice,
              rotationDirection,
              modelRef.current
            );
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
  function rotateModel90Y(m) {
    let source;
    m ? (source = m) : (source = model);
    let copy = JSON.parse(JSON.stringify(source));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "left", "y");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90Y");
    setModel(newModel);
    modelRef.current = newModel;
  }

  function rotateModel90X(m) {
    let source;
    m ? (source = m) : (source = model);
    let copy = JSON.parse(JSON.stringify(source));
    let coords = cubeModel.modelToCoordinateArray();
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "right", "x");
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    setRotationToBe("rotatedFloor90X");
    setModel(newModel);
    modelRef.current = newModel;
  }

  /*---------------------------------------------------------------------------.*/
  /*Determines which direction the user is trying to rotate the cube.*/
  const computeDirection = (x, y) => {
    animatingRef.current = true;

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
    }
  };

  /*Event handlers----------------------------------------------------------*/

  /*callback to solve the cube*/
  const solve = (e) => {
    if (!solvingRef.current && !animatingRef.current) {
      solvingRef.current = true;
      check.current = true;

      let test = Cube.fromString(cubeModel.getFaceletString(modelRef.current));
      let solveString = test.solve();
      /*------------------- */

      let parsed = tools.parseMoveString(solveString);
      scheduleSolveAnimation(parsed);
    }
  };

  /*callback to randomize the cube*/
  const randomize = (e) => {
    if (!solvingRef.current && !animatingRef.current) {
      cubeRef.current = Cube.random();
      let cubeStringEncoding = cubeRef.current.asString();
      randomizedRef.current = true;
      colorUtils.initializeCubeColors(el, cubeStringEncoding);
      let mod = cubeModel.paintModel(cubeStringEncoding);
      setModel(mod);
      modelRef.current = mod;
    }
  };

  const mousemoving = (e) => {
    e.preventDefault();
    if (mouseDown) {
      if (!calculatingRef.current) {
        targetRef.current = e.target.id;
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
  };

  /*initializes the state where a user is rotating the entire cube around to look at it.*/
  const initialRotation = (e) => {
    if (!e.target.id) {
      setMouseDownRotation(true);
      setInitialMouseYPos(e.pageX);
      setInitialMouseXPos(e.pageY);
    }
  };

  /*ends the user rotation state.*/
  const releaseRotation = (e) => {
    if (setMouseDownRotation) {
      setMouseDownRotation(false);
      setXRotation(xRotation + initialMouseXPos - e.pageY);
      setYRotation(yRotation + e.pageX - initialMouseYPos);
    }
  };

  /*Initializes a state where the user is dragging and trying to rotate a slice .*/
  const initial = (e) => {
    if (!animatingRef.current && !solvingRef.current) {
      setMouseDown(true);
    }
    e.stopPropagation();
  };

  /*Fires an animation on mouse-up.*/
  const shiftRelease = (e) => {
    if (!mouseUpTimeout.current && !solvingRef.current) {
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
        }, animationSpeed);
      }
    }
    e.stopPropagation();
  };

  /*prevent drag default behaviour*/
  const dragstart = (e) => {
    e.preventDefault();
  };
  const drop = (e) => {
    e.preventDefault();
  };
  /*-------------------------------------------------------------------------*/
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
          dispatchRotateEvent(sliceTuple[0], colorData.rotationOrder[0], model);
        }
        break;
      case "east":
        setRotationDirection(
          tools.reverseDirection(colorData.rotationOrder[0])
        );
        setTargetSlice(sliceTuple[0]);
        if (colorData.westFunc) {
          colorData.westFunc();
        } else {
          setRotationToBe("initialFloor");
          dispatchRotateEvent(
            sliceTuple[0],
            tools.reverseDirection(colorData.rotationOrder[0]),
            model
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
        setRotationDirection(
          tools.reverseDirection(colorData.rotationOrder[1])
        );
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

  const autoAnimate = (code, model) => {
    switch (code) {
      case "R":
        setRotationDirection("c");
        setTargetSlice("top");
        rotateModel90Y(model);
        break;
      case "R'":
        setRotationDirection("cc");
        setTargetSlice("top");
        rotateModel90Y(model);
        break;
      case "L":
        setRotationDirection("cc");
        setTargetSlice("bottom");
        rotateModel90Y(model);
        break;
      case "L'":
        setRotationDirection("c");
        setTargetSlice("bottom");
        rotateModel90Y(model);
        break;
      case "U":
        setRotationDirection("c");
        setTargetSlice("top");
        setRotationToBe("initialFloor");
        dispatchRotateEvent("top", "c", model);
        break;
      case "U'":
        setRotationDirection("cc");
        setTargetSlice("top");
        setRotationToBe("initialFloor");
        dispatchRotateEvent("top", "cc", model);
        break;
      case "D":
        setRotationDirection("c");
        setTargetSlice("bottom");
        setRotationToBe("initialFloor");
        dispatchRotateEvent("bottom", "cc", model);
        break;
      case "D'":
        setRotationDirection("cc");
        setTargetSlice("bottom");
        setRotationToBe("initialFloor");
        dispatchRotateEvent("bottom", "c", model);
        break;
      case "F":
        setRotationDirection("c");
        setTargetSlice("top");
        rotateModel90X(model);
        break;
      case "F'":
        setRotationDirection("cc");
        setTargetSlice("top");
        rotateModel90X(model);
        break;
      case "B":
        setRotationDirection("cc");
        setTargetSlice("bottom");
        rotateModel90X(model);
        break;
      case "B'":
        setRotationDirection("c");
        setTargetSlice("bottom");
        rotateModel90X(model);
        break;
    }
  };

  const scheduleSolveAnimation = async (moveString) => {
    const moveArray = moveString.split(" ");
    const funcArray = [];
    setLoaded(true);
    moveArray.forEach((item, i) => {
      const f = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            autoAnimate(item, modelRef.current);

            console.log(Date.now() - time.current);
            time.current = Date.now();
            resolve();
          }, 1300);
        });
      };
      funcArray.push(f);
    });
    for (let i = 0; i < funcArray.length; i++) {
      await funcArray[i]();
    }
    solvingRef.current = false;
    setTimeout(() => {
      disable.current = false;
    }, 850);
  };

  /* 
  
  */
  return (
    <div>
      <img
        className="loadingSpinner"
        src={require("../resources/gifs/loading-buffering.gif")}
        alt="loading..."
        style={{ visibility: !loaded ? "visible" : "hidden" }}
      />
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
            <SingleCube info={faceData.jsxCubeData[0]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[1]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[2]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[3]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[4]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[5]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[6]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[7]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[8]} handler={initial} />
          </div>
          <div className={`middleHorizontalPlane ${middleClassName}`}>
            <SingleCube info={faceData.jsxCubeData[9]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[10]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[11]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[12]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[13]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[14]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[15]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[16]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[17]} handler={initial} />
          </div>
          <div className={`bottomHorizontalPlane ${bottomClassName}`}>
            <SingleCube info={faceData.jsxCubeData[18]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[19]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[20]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[21]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[22]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[23]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[24]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[25]} handler={initial} />
            <SingleCube info={faceData.jsxCubeData[26]} handler={initial} />
          </div>
        </div>
      </div>
      <SolveButton handler={solve} status={disable} />
      <RandomizeButton handler={randomize} status={disable} />
    </div>
  );
};

export default RubiksCube;
