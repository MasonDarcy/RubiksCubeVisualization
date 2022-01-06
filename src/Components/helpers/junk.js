/*Sets class names for animations, rotates the model when they're done*/
// const protoRotateEvent = () => {
//   switch (animClass) {
//     case "protoShiftLeft":
//       setTopClassName(animClass);
//       break;
//     case "protoShiftRight":
//       setTopClassName(animClass);
//       break;
//     case "protoShiftMiddle":
//       setMiddleClassName(animClass);
//       break;
//     case "protoShiftBottom":
//       setBottomClassName(animClass);
//       break;
//   }

//   setTimeout(() => {
//     console.log(`Direction: ${paramDirection}`);
//     rotate(getModelRange(animClass), paramDirection);
//   }, 5000);
// };

/*helper for deciding which slice to rotate ho*/
//   const getModelRange = (animClass) => {
//     switch (animClass) {
//       case "protoShiftLeft":
//       case "protoShiftRight":
//         return 0;
//       case "protoShiftMiddle":
//         return 1;
//       case "protoShiftBottom":
//         return 2;
//     }
//   };

/*Helper called by rotate event after the timeout*/
/*Now that I know the direction, I can mess with rotate*/
//   const rotate = (sliceNum, paramDirection) => {
//     let rotationFunction;
//     let swapped;

//     if (paramDirection == "North") {
//       rotationFunction = tools.rotateColors90C;
//       swapped = tools.rotate90(model[sliceNum]);
//     }
//     if (paramDirection == "South") {
//       rotationFunction = tools.rotateColors90CC;
//       swapped = tools.rotate90CC(model[sliceNum]);
//     }
//     if (paramDirection == "West") {
//       rotationFunction = tools.rotateColors90C;
//       swapped = tools.rotate90(model[sliceNum]);
//     }
//     if (paramDirection == "East") {
//       rotationFunction = tools.rotateColors90CC;
//       swapped = tools.rotate90CC(model[sliceNum]);
//     }

//     for (let i = 0; i < 3; i++) {
//       swapped[i].forEach((cube) => {
//         //tools.rotateColors90CC(cube);
//         rotationFunction(cube);
//       });
//     }

//     let copy = JSON.parse(JSON.stringify(model));
//     copy[sliceNum] = swapped;

//     setModel(copy);
//   };

/*Sets class names for animations, rotates the model when they're done*/
// const rotateEvent = (animClass, paramDirection) => {
//     console.log(`Rotate event direction: ${paramDirection}`);
//     switch (animClass) {
//       case "protoShiftLeft":
//         setTopClassName(animClass);
//         break;
//       case "protoShiftRight":
//         setTopClassName(animClass);
//         break;
//       case "protoShiftMiddle":
//         setMiddleClassName(animClass);
//         break;
//       case "protoShiftBottom":
//         setBottomClassName(animClass);
//         break;
//     }

//     setTimeout(() => {
//       console.log(`Direction: ${paramDirection}`);
//       rotate(getModelRange(animClass), paramDirection);
//     }, 5000);
//   };

// const mousemoving = (e) => {
//     e.preventDefault();
//     if (mouseDown) {
//       if (e.pageX > oldX && e.pageY == oldY) {
//         // console.log("East");
//         // setDirection("East");
//         // let userPerspective = isXUpsideDown();
//         // console.log(`Is upside down: ${userPerspective}`);
//         // if (userPerspective != "up") {
//         //   rotateEvent("protoShiftLeft", "West");
//         // } else {
//         //   rotateEvent("protoShiftRight", "East");
//         // }
//         // setMouseDown(false);
//         console.log("East");
//         setDirection("East");
//         animationDelegator(e.target.id, "east");
//         setMouseDown(false);
//       } else if (e.pageX == oldX && e.pageY > oldY) {
//         setDirection("South");
//         console.log("South");
//         setMouseDown(false);
//         // if (rotation == "initialFloor") {
//         //   rotateModel90X();
//         // }
//         // if (rotation == "rotatedFloor90Y") {
//         //   let userPerspective = isXUpsideDown();
//         //   console.log(`user perspective: ${userPerspective}`);
//         //   if (userPerspective == "up") {
//         //     rotateEvent("protoShiftRight", "East");
//         //   } else {
//         //     rotateEvent("protoShiftLeft", "West");
//         //   }
//         }
//       } else if (e.pageX == oldX && e.pageY < oldY) {
//         console.log("North");
//         setMouseDown(false);
//         setDirection("North");
//         if (rotation == "initialFloor") {
//           rotateModel90X();
//         }
//         if (rotation == "rotatedFloor90Y") {
//           // rotateEvent("protoShiftLeft", "West");
//           let userPerspective = isXUpsideDown();
//           console.log(`user perspective: ${userPerspective}`);
//           if (userPerspective == "up") {
//             rotateEvent("protoShiftLeft", "West");
//           } else {
//             rotateEvent("protoShiftRight", "East");
//           }
//         }
//       } else if (e.pageX < oldX && e.pageY == oldY) {
//         console.log("West");
//         setDirection("West");
//         //  let userPerspective = isXUpsideDown();
//         // if (rotation == "rotatedFloor90X") {
//         //   rotateModelNeg90X();
//         // }
//         // if (rotation == "initialFloor") {
//         //   if (userPerspective != "up") {
//         //     rotateEvent("protoShiftRight", "East");
//         //   } else {
//         //     rotateEvent("protoShiftLeft", "West");
//         //   }
//         // }

//         animationDelegator(e.target.id, "west");
//         setMouseDown(false);
//       }
//     }

//     if (mouseDownRotation) {
//       //here we want to mutate the x-axis and the z-axis
//       // el.current.style.setProperty(
//       //   `--color${p * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`,
//       //   color
//       // );
//       // console.log(`x-rotation-css-variable:
//       //  ${getComputedStyle(plane.current).getPropertyValue("--x-rotation")}`);
//       let changeY = e.pageX - initialMouseYPos;
//       let changeX = initialMouseXPos - e.pageY;

//       // console.log(`Change: ${change}`);
//       // console.log(`xRotation: ${xRotation}`);

//       // console.log(`Change: ${xRotation + change}`);
//       plane.current.style.setProperty(`--x-rotation`, xRotation + changeX);
//       plane.current.style.setProperty(`--y-rotation`, yRotation + changeY);
//     }

//     setOldX(e.pageX);
//     setOldY(e.pageY);
//   };

// useEffect(() => {
//     if (firstRender.current) {
//       firstRender.current = false;

//       return;
//     } else {
//       if (topClassName) {
//         colorUtils.remapSliceColors(0, model, el);
//         setTopClassName(null);
//       } else if (middleClassName) {
//         colorUtils.remapSliceColors(1, model, el);
//         setMiddleClassName(null);
//       } else if (bottomClassName) {
//         colorUtils.remapSliceColors(2, model, el);
//         setBottomClassName(null);
//       } else {
//         console.log(`rotation to be: ${rotationToBe}`);
//         switch (rotationToBe) {
//           case "initialFloor":
//             // dispatchRotateEvent();
//             break;
//           case "rotatedFloor90Y":
//             setRotation(rotationToBe);
//             colorUtils.remapAllColors(model, el, "right");
//             dispatchRotateEvent();
//             break;
//           case "rotatedFloor90X":
//             setRotation(rotationToBe);
//             colorUtils.remapAllColorsX(model, el, "right");
//             dispatchRotateEvent();
//             break;
//         }
//         //use state to call the animations

//         // setRotation("rotatedFloor90Y");
//         //  setRotation(rotationToBe);

//         // if (rotation == "initialFloor") {
//         //   console.log("left remap colors");

//         //   colorUtils.remapAllColorsX(model, el, "right");
//         // } else {
//         //   console.log("right remap colors");
//         //   colorUtils.remapAllColorsX(model, el, "left");
//         // }
//         // console.log(`direction: ${direction}`);
//         // if (direction == "South") {
//         //    rotateEvent("protoShiftRight", direction);
//         // }
//         // if (direction == "North") {
//         //    rotateEvent("protoShiftLeft", direction);
//         //     }

//         //  console.log(`Logged direction: ${direction} in useEffect`);

//         //   console.log(model);
//       }
//     }
//   }, [model]);

// remappedDirection = xPerspectiveRemap(direction);
// console.log(remappedDirection);
// switch (remappedDirection) {
//   case "west":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "c");
//     break;
//   case "east":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "cc");
//     break;
//   case "north":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("bottom");
//     rotateModel90Y();
//     break;
//   case "south":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("bottom");
//     rotateModel90Y();
//     break;
// }
// break;

// remappedDirection = xPerspectiveRemap(direction);
// console.log(remappedDirection);
// switch (remappedDirection) {
//   case "west":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "c");
//     break;
//   case "east":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "cc");
//     break;
//   case "north":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("bottom");
//     rotateModel90X();
//     break;
//   case "south":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("bottom");
//     rotateModel90X();
//     break;
// }
// break;
// break;

// remappedDirection = xPerspectiveRemap(direction);
// console.log(remappedDirection);
// switch (remappedDirection) {
//   case "west":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "c");
//     break;
//   case "east":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "cc");
//     break;
//   case "north":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("bottom");
//     rotateModel90X();
//     break;
//   case "south":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("bottom");
//     rotateModel90X();
//     break;
// }
//break;

// remappedDirection = xPerspectiveRemap(direction);
// console.log(remappedDirection);
// switch (remappedDirection) {
//   case "west":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "c");
//     break;
//   case "east":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("top");
//     setRotationToBe("initialFloor");
//     dispatchRotateEvent("top", "cc");
//     break;
//   case "north":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("c");
//     setTargetSlice("bottom");
//     rotateModel90Y();
//     break;
//   case "south":
//     console.log(
//       `id: ${id}, rotation: ${rotation}, direction: ${direction}`
//     );
//     setRotationDirection("cc");
//     setTargetSlice("bottom");
//     rotateModel90Y();
//     break;
// }
//break;

//Old direction code segment
// if (e.pageX > oldX && e.pageY == oldY) {
//     // console.log("Mousemove: East");
//     // setDirection("East");
//     // animationDelegator(e.target.id, "east");
//     // setMouseDown(false);
//   } else if (e.pageX == oldX && e.pageY > oldY) {
//     // setDirection("Mousemove: South");
//     // console.log("South");
//     // animationDelegator(e.target.id, "south");
//     // setMouseDown(false);
//   } else if (e.pageX == oldX && e.pageY < oldY) {
//     // console.log("Mousemove: North");
//     // setDirection("North");
//     // animationDelegator(e.target.id, "north");
//     // setMouseDown(false);
//   } else if (e.pageX < oldX && e.pageY == oldY) {
//     // console.log("Mousemove: West");
//     // setDirection("West");
//     // animationDelegator(e.target.id, "west");
//     // setMouseDown(false);
//   }

// const isXUpsideDown = () => {
//     let degree = xRotation % 360;
//     console.log(degree);
//     if (
//       (degree >= -90 && degree <= 90) ||
//       (degree >= 270 && degree <= 360) ||
//       (degree > -360 && degree < -270)
//     ) {
//       return "up";
//     } else {
//       return "down";
//     }
//   };

// const rotateUniverseX = (universe, direction) => {
//     const rotatedSystem = [];

//     for (let i = 0; i < universe.length; i++) {
//       let newCoord = [];
//       let val = 0;
//       for (let q = 0; q <= 2; q++) {
//         for (let c = 0; c <= 2; c++) {
//           val +=
//             universe[i][c] *
//             (direction == "right"
//               ? rotationRightMatrixX[q][c]
//               : rotationLeftMatrixX[q][c]);
//         }
//         newCoord.push(val);
//         val = 0;
//       }

//       rotatedSystem.push(newCoord);
//     }
//     return rotatedSystem;
//   };

//   const rotateUniverse = (universe, direction) => {
//     const rotatedSystem = [];

//     for (let i = 0; i < universe.length; i++) {
//       let newCoord = [];
//       let val = 0;
//       for (let q = 0; q <= 2; q++) {
//         for (let c = 0; c <= 2; c++) {
//           val +=
//             universe[i][c] *
//             (direction == "right"
//               ? rotationRightMatrix[q][c]
//               : rotationLeftMatrix[q][c]);
//         }
//         newCoord.push(val);
//         val = 0;
//       }

//       rotatedSystem.push(newCoord);
//     }
//     return rotatedSystem;
//   };

// let topFaceIndices = [5, 11, 17, 23, 29, 35, 41, 47, 53];
// let rightFaceIndices = [15, 33, 51, 69, 87, 105, 123, 141, 159];
// let frontFaceIndices = [37, 43, 49, 91, 97, 103, 145, 151, 157];
// let downFaceIndices = [114, 120, 126, 132, 138, 144, 150, 156, 162];
// let leftFaceIndices = [4, 22, 40, 58, 76, 94, 112, 130, 148];
// let backFaceIndices = [2, 8, 14, 56, 62, 68, 110, 116, 122];

// let faces = [
//   topFaceIndices,
//   rightFaceIndices,
//   frontFaceIndices,
//   downFaceIndices,
//   leftFaceIndices,
//   backFaceIndices,
// ];

// const createTopSlice = () => {
//     let model = [];
//     let topSlice = [];
//     let middleSlice = [];
//     let bottomSlice = [];
//     let topBack = [];
//     let topMiddle = [];
//     let topFront = [];
//     let middleBack = [];
//     let middleMiddle = [];
//     let middleFront = [];
//     let bottomBack = [];
//     let bottomMiddle = [];
//     let bottomFront = [];
//     /*Top slice--------------------------------------------------- */
//     let cube1 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     let cube2 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     let cube3 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     topBack.push(cube1);
//     topBack.push(cube2);
//     topBack.push(cube3);
//     let cube4 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     let cube5 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];

//     let cube6 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     topMiddle.push(cube4);
//     topMiddle.push(cube5);
//     topMiddle.push(cube6);
//     let cube7 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     let cube8 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     let cube9 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 5 },
//       { currentColor: 0 },
//     ];
//     topFront.push(cube7);
//     topFront.push(cube8);
//     topFront.push(cube9);
//     topSlice.push(topBack);
//     topSlice.push(topMiddle);
//     topSlice.push(topFront);

//     /*Middle slice--------------------------------------------------- */
//     let cube10 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube11 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube12 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     middleBack.push(cube10);
//     middleBack.push(cube11);
//     middleBack.push(cube12);

//     let cube13 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube14 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube15 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     middleMiddle.push(cube13);
//     middleMiddle.push(cube14);
//     middleMiddle.push(cube15);

//     let cube16 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube17 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     let cube18 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//     ];
//     middleFront.push(cube16);
//     middleFront.push(cube17);
//     middleFront.push(cube18);
//     middleSlice.push(middleBack);
//     middleSlice.push(middleMiddle);
//     middleSlice.push(middleFront);

//     /*Bottom slice--------------------------------------------------- */
//     let cube19 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube20 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube21 = [
//       { currentColor: 0 },
//       { currentColor: 2 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     bottomBack.push(cube19);
//     bottomBack.push(cube20);
//     bottomBack.push(cube21);

//     let cube22 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube23 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube24 = [
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     bottomMiddle.push(cube22);
//     bottomMiddle.push(cube23);
//     bottomMiddle.push(cube24);

//     let cube25 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 4 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube26 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     let cube27 = [
//       { currentColor: 1 },
//       { currentColor: 0 },
//       { currentColor: 3 },
//       { currentColor: 0 },
//       { currentColor: 0 },
//       { currentColor: 6 },
//     ];
//     bottomFront.push(cube25);
//     bottomFront.push(cube26);
//     bottomFront.push(cube27);
//     bottomSlice.push(bottomBack);
//     bottomSlice.push(bottomMiddle);
//     bottomSlice.push(bottomFront);
//     /*--------------------------------------------------------------- */
//     model.push(topSlice);
//     model.push(middleSlice);
//     model.push(bottomSlice);
//     return model;
//   };
