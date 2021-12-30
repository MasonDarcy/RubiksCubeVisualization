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

  const rotateModelAndRecolor = (sliceNum) => {
    let rotationFunction;
    let swapped;

    if (rotationDirection == "c") {
      rotationFunction = tools.rotateColors90C;
      console.log(`sliceNum: ${sliceNum}`);

      swapped = tools.rotate90(model[sliceNum]);
    } else {
      rotationFunction = tools.rotateColors90CC;
      console.log(`sliceNum: ${sliceNum}`);
      swapped = tools.rotate90CC(model[sliceNum]);
    }

    for (let i = 0; i < 3; i++) {
      swapped[i].forEach((cube) => {
        rotationFunction(cube);
      });
    }

    let copy = JSON.parse(JSON.stringify(model));
    copy[sliceNum] = swapped;
    setModel(copy);
  };

  const dispatchRotateEvent = () => {
    console.log(targetSlice);
    console.log(rotationDirection);
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
        break;
      case "bottom":
    }

    setTimeout(() => {
      //need slice num
      rotateModelAndRecolor(planeToNum());
      console.log("rotate and recolor??");
    }, 5000);
  };

  function planeToNum() {
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
        colorUtils.remapSliceColors(0, model, el);
        setTopClassName(null);
      } else if (middleClassName) {
        colorUtils.remapSliceColors(1, model, el);
        setMiddleClassName(null);
      } else if (bottomClassName) {
        colorUtils.remapSliceColors(2, model, el);
        setBottomClassName(null);
      } else {
        console.log(`rotation to be: ${rotationToBe}`);
        switch (rotationToBe) {
          case "initialFloor":
            // dispatchRotateEvent();
            break;
          case "rotatedFloor90Y":
            setRotation(rotationToBe);
            colorUtils.remapAllColors(model, el, "right");
            dispatchRotateEvent();
            break;
          case "rotatedFloor90X":
            setRotation(rotationToBe);
            colorUtils.remapAllColorsX(model, el, "right");
            dispatchRotateEvent();
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
    console.log(coords);

    //"left" here controls direction I think
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "left");
    // console.log(shiftedUniverse);
    //Produces a matrix, each "point" has the co-ordinates of where it should go
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);

    setRotationToBe("rotatedFloor90Y");
    setModel(newModel);
  }

  function rotateModelNeg90Y() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    //"left" here controls direction I think
    console.log(coords);
    let shiftedUniverse = cubeModel.rotateUniverse(coords, "right");
    console.log(shiftedUniverse);
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    console.log(model);
    console.log(newModel);
    setRotationToBe("initialFloor");
    setModel(newModel);
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
    console.log("RotateModel90X called");
  }

  function rotateModelNeg90X() {
    let copy = JSON.parse(JSON.stringify(model));
    let coords = cubeModel.modelToCoordinateArray();
    //"left" here controls direction I think
    console.log(coords);
    let shiftedUniverse = cubeModel.rotateUniverseX(coords, "left");
    console.log(shiftedUniverse);
    let newModel = cubeModel.updateModel(shiftedUniverse, copy);
    console.log(model);
    console.log(newModel);
    setRotationToBe("initialFloor");
    setModel(newModel);
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
        console.log(xRotation);
        setXRotation(xRotation + initialMouseXPos - e.pageY);
        setYRotation(yRotation + e.pageX - initialMouseYPos);
        console.log(isXUpsideDown());
      }
    }
  };

  const mousemoving = (e) => {
    e.preventDefault();
    if (mouseDown) {
      if (e.pageX > oldX && e.pageY == oldY) {
        console.log("East");
        setDirection("East");
        animationDelegator(e.target.id, "east");
        setMouseDown(false);
      } else if (e.pageX == oldX && e.pageY > oldY) {
        setDirection("South");
        console.log("South");
        setMouseDown(false);
      } else if (e.pageX == oldX && e.pageY < oldY) {
        console.log("North");
        setDirection("North");
        animationDelegator(e.target.id, "north");
        setMouseDown(false);
      } else if (e.pageX < oldX && e.pageY == oldY) {
        console.log("West");
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

  const animationDelegator = (id, direction) => {
    switch (id) {
      case "redSideOneOne":
        switch (rotation) {
          case "initialFloor":
            switch (direction) {
              case "west":
                console.log(
                  `id: ${id}, rotation: ${rotation}, direction: ${direction}`
                );
                setRotationDirection("cc");
                setTargetSlice("bottom");
                rotateModel90X();
                break;
              case "east":
                console.log(
                  `id: ${id}, rotation: ${rotation}, direction: ${direction}`
                );
                setRotationDirection("c");
                setTargetSlice("bottom");
                rotateModel90X();
                break;
              case "north":
                console.log(
                  `id: ${id}, rotation: ${rotation}, direction: ${direction}`
                );
                setRotationDirection("c");
                setTargetSlice("bottom");
                rotateModel90Y();
                break;
            }
            break;
        }
        break;
      case "redSideOneTwo":
        break;
      case "redSideOneThree":
        break;
      case "redSideTwoOne":
        break;
      case "redSideTwoTwo":
        break;
      case "redSideTwoThree":
        break;
      case "redSideThreeOne":
        break;
      case "redSideThreeTwo":
        break;
      case "redSideThreeThree":
        break;
      case "orangeSideOneOne":
        break;
      case "orangeSideOneTwo":
        break;
      case "orangeSideOneThree":
        break;
      case "orangeSideTwoOne":
        break;
      case "orangeSideTwoTwo":
        break;
      case "orangeSideTwoThree":
        break;
      case "orangeSideThreeOne":
        break;
      case "orangeSideThreeTwo":
        break;
      case "orangeSideThreeThree":
        break;
      case "whiteSideOneOne":
        break;
      case "whiteSideOneTwo":
        break;
      case "whiteSideOneThree":
        break;
      case "whiteSideTwoOne":
        break;
      case "whiteSideTwoTwo":
        break;
      case "whiteSideTwoThree":
        break;
      case "whiteSideThreeOne":
        break;
      case "whiteSideThreeTwo":
        break;
      case "whiteSideThreeThree":
        break;
      case "greenSideOneOne":
        break;
      case "greenSideOneTwo":
        break;
      case "greenSideOneThree":
        break;
      case "greenSideTwoOne":
        break;
      case "greenSideTwoTwo":
        break;
      case "greenSideTwoThree":
        break;
      case "greenSideThreeOne":
        break;
      case "greenSideThreeTwo":
        break;
      case "greenSideThreeThree":
        break;
      case "blueSideOneOne":
        break;
      case "blueSideOneTwo":
        break;
      case "blueSideOneThree":
        break;
      case "blueSideTwoOne":
        break;
      case "blueSideTwoTwo":
        break;
      case "blueSideTwoThree":
        break;
      case "blueSideThreeOne":
        break;
      case "blueSideThreeTwo":
        break;
      case "blueSideThreeThree":
        break;
      case "yellowSideOneOne":
        break;
      case "yellowSideOneTwo":
        break;
      case "yellowSideOneThree":
        break;
      case "yellowSideTwoOne":
        break;
      case "yellowSideTwoTwo":
        break;
      case "yellowSideTwoThree":
        break;
      case "yellowSideThreeOne":
        break;
      case "yellowSideThreeTwo":
        break;
      case "yellowSideThreeThree":
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
          <div id="whiteSideOneOne">2t</div>
          <div>3t</div>
          <div id="greenSideOneOne">4t</div>
          <div id="redSideOneOne" onMouseDown={initial}>
            {" "}
            5t
          </div>
          <div>6t</div>
          <div>7t</div>
          <div id="whiteSideOneTwo">8t</div>
          <div>9t</div>
          <div>10t</div>
          <div id="redSideOneTwo">11t </div>
          <div>12t</div>
          <div>13t</div>
          <div id="whiteSideOneThree">14t</div>
          <div id="blueSideOneOne">15t</div>
          <div>16t</div>
          <div id="redSideOneThree">17t</div>
          <div>18t</div>
          <div>19t</div>
          <div>20t</div>
          <div>21t</div>
          <div id="greenSideOneTwo">22t</div>
          <div id="redSideTwoOne">23t</div>
          <div>24t</div>
          <div>25t</div>
          <div>26t</div>
          <div id="yellowSideOneOne">27t</div>
          <div>28t</div>
          <div id="redSideTwoTwo">29t</div>
          <div>30t</div>
          <div>31t</div>
          <div>32t</div>
          <div>33t</div>
          <div id="blueSideOneTwo">34t</div>
          <div id="redSideTwoThree">35t</div>
          <div>36t</div>
          <div id="yellowSideOneOne">37t</div>
          <div>38t</div>
          <div>39t</div>
          <div id="greenSideOneThree">40t</div>
          <div id="redSideThreeOne">41t</div>
          <div>42t</div>
          <div id="yellowSideOneTwo">43t</div>
          <div>44t</div>
          <div>45t</div>
          <div>46t</div>
          <div id="redSideThreeTwo">47t</div>
          <div>48t</div>
          <div onMouseDown={initial} id="yellowSideOneThree">
            49t
          </div>
          <div>50t</div>
          <div id="blueSideOneThree">51t</div>
          <div>52t</div>
          <div onMouseDown={initial} className="redSideThreeThree">
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
          <div id="whiteSideTwoOne">2</div>
          <div>3</div>
          <div id="greenSideTwoOne">4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div id="whiteSideTwoTwo">8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div id="whiteSideTwoThree">14</div>
          <div id="blueSideTwoOne">15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div id="greenSideTwoTwo">22</div>
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
          <div id="blueSideTwoTwo">33</div>
          <div>34</div>
          <div>35</div>
          <div>36</div>
          <div id="yellowSideTwoOne">37</div>
          <div>38</div>
          <div>39</div>
          <div id="greenSideTwoThree">40</div>
          <div>41</div>
          <div>42</div>
          <div id="yellowSideTwoTwo">43</div>
          <div>44</div>
          <div>45</div>
          <div>46</div>
          <div>47</div>
          <div>48</div>
          <div id="yellowSideTwoThree">49</div>
          <div>50</div>
          <div id="blueSideTwoThree">51</div>
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
          <div id="whiteSideThreeOne">2a</div>
          <div>3a</div>
          <div id="greenSideThreeOne">4a</div>
          <div>5a</div>
          <div id="orangeSideOneOne">6a</div>
          <div>7a</div>
          <div id="whiteSideThreeTwo">8a</div>
          <div>9a</div>
          <div>10a</div>
          <div>11a</div>
          <div id="orangeSideOneTwo">12a</div>
          <div>13a</div>
          <div id="whiteSideThreeThree">14a</div>
          <div id="blueSideThreeOne">15a</div>
          <div>16a</div>
          <div>17a</div>
          <div id="orangeSideOneThree">18a</div>
          <div>19a</div>
          <div>20a</div>
          <div>21a</div>
          <div id="greenSideThreeTwo">22a</div>
          <div>23a</div>
          <div id="orangeSideTwoOne">24a</div>
          <div>25a</div>
          <div>26a</div>
          <div>27a</div>
          <div>28a</div>
          <div>29a</div>
          <div id="orangeSideTwoTwo">30a</div>
          <div>31a</div>
          <div>32a</div>
          <div id="blueSideThreeTwo">33a</div>
          <div>34a</div>
          <div>35a</div>
          <div id="orangeSideTwoThree">36a</div>
          <div id="yellowSideThreeOne">37a</div>
          <div>38a</div>
          <div>39a</div>
          <div id="greenSideThreeThree">40a</div>
          <div>41a</div>
          <div id="orangeSideThreeOne">42a</div>
          <div id="yellowSideThreeTwo">43a</div>
          <div>44a</div>
          <div>45a</div>
          <div>46a</div>
          <div>47a</div>
          <div id="orangeSideThreeTwo">48a</div>
          <div id="yellowSideThreeThree">49a</div>
          <div>50a</div>
          <div id="blueSideThreeThree">51a</div>
          <div>52a</div>
          <div>53a</div>
          <div id="orangeSideThreeThree">54a</div>
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
