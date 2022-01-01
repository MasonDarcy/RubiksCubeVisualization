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
