import "../styles/protorotation.css";
import { useState, useRef, useEffect } from "react";
import tools from "./helpers/util";
import cubeModel from "./helpers/cubeModel";

const ProtoRotation = () => {
  const [topClassName, setTopClassName] = useState(null);
  const [middleClassName, setMiddleClassName] = useState(null);
  const [bottomClassName, setBottomClassName] = useState(null);
  const [model, setModel] = useState(cubeModel.createTopSlice());

  /* 
   model [    
 [[3], [3], [3]],
[[3], [3], [3]],
[[3], [3], [3]],
  ]
  
  */

  const [mode, setMode] = useState("horizontal");
  const [verticalClassName, setVerticalClassName] = useState(null);
  const el = useRef(null);
  const firstRender = useRef(true);

  const remapColors = (sliceNum) => {
    for (let i = 0; i < 3; i++) {
      model[sliceNum][i].forEach((cube, cubeIndex) => {
        cube.forEach((side, sideIndex) => {
          let color = colorMapper(side.currentColor);
          //  console.log(`${m * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`);
          el.current.style.setProperty(
            `--color${
              sliceNum * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)
            }`,
            color
          );
        });
      });
    }
  };

  const rotate = (sliceNum) => {
    let swapped = tools.rotate90(model[sliceNum]);
    for (let i = 0; i < 3; i++) {
      swapped[i].forEach((cube) => {
        tools.rotateColors90(cube);
      });
    }

    let copy = JSON.parse(JSON.stringify(model));
    copy[sliceNum] = swapped;

    setModel(copy);
  };

  const colorMapper = (colorNum) => {
    //given a number, return a color
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

  const getModelRange = (animClass) => {
    switch (animClass) {
      case "protoShift":
        return 0;
      case "protoShiftMiddle":
        return 1;
      case "protoShiftBottom":
        return 2;
    }
  };
  console.log(cubeModel.modelToCoordinateArray());

  console.log(
    cubeModel.rotateUniverse(cubeModel.modelToCoordinateArray(), "right")
  );

  const rotateEvent = (animClass) => {
    switch (animClass) {
      case "protoShift":
        setTopClassName(animClass);
        break;
      case "protoShiftMiddle":
        setMiddleClassName(animClass);
        break;
      case "protoShiftBottom":
        setBottomClassName(animClass);
        break;
    }

    setTimeout(() => {
      console.log(model);
      rotate(getModelRange(animClass));
    }, 5000);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      if (topClassName) {
        remapColors(0);
        setTopClassName(null);
      } else if (middleClassName) {
        remapColors(1);
        setMiddleClassName(null);
      } else {
        remapColors(2);
        setBottomClassName(null);
      }
    }
  }, [model]);

  return (
    <div className="seen" ref={el}>
      <div className="rotatedFloor">
        <div
          onClick={() => {
            rotateEvent("protoShift");
          }}
          className={`topHorizontalPlane ${topClassName}`}
        >
          <div className="facet">1</div>
          <div className="facet">2</div>
          <div className="facet">3</div>
          <div className="facet">4</div>
          <div className="facet">5</div>
          <div className="facet">6</div>
          <div className="facet">7</div>
          <div className="facet">8</div>
          <div className="facet">9</div>
          <div className="facet">10</div>
          <div className="facet">11</div>
          <div className="facet">12</div>
          <div className="facet">13</div>
          <div className="facet">14</div>
          <div className="facet">15</div>
          <div className="facet">16</div>
          <div className="facet">17</div>
          <div className="facet">18</div>
          <div className="facet">19</div>
          <div className="facet">20</div>
          <div className="facet">21</div>
          <div className="facet">22</div>
          <div className="facet">23</div>
          <div className="facet">24</div>
          <div className="facet">25</div>
          <div className="facet">26</div>
          <div className="facet">27</div>
          <div className="facet">28</div>
          <div className="facet">29</div>
          <div className="facet">30</div>
          <div className="facet">31</div>
          <div className="facet">32</div>
          <div className="facet">33</div>
          <div className="facet">34</div>
          <div className="facet">35</div>
          <div className="facet">36</div>
          <div className="facet">37</div>
          <div className="facet">38</div>
          <div className="facet">39</div>
          <div className="facet">40</div>
          <div className="facet">41</div>
          <div className="facet">42</div>
          <div className="facet">43</div>
          <div className="facet">44</div>
          <div className="facet">45</div>
          <div className="facet">46</div>
          <div className="facet">47</div>
          <div className="facet">48</div>
          <div className="facet">49</div>
          <div className="facet">50</div>
          <div className="facet">51</div>
          <div className="facet">52</div>
          <div className="facet">53</div>
          <div className="facet">54</div>
          <div className="facet">55</div>
          <div className="facet">56</div>
          <div className="facet">57</div>
          <div className="facet">58</div>
          <div className="facet">59</div>
          <div className="facet">60</div>
        </div>
        <div
          className={`middleHorizontalPlane ${middleClassName}`}
          onClick={() => {
            rotateEvent("protoShiftMiddle");
          }}
        >
          <div className="facet">1</div>
          <div className="facet">2</div>
          <div className="facet">3</div>
          <div className="facet">4</div>
          <div className="facet">5</div>
          <div className="facet">6</div>
          <div className="facet">7</div>
          <div className="facet">8</div>
          <div className="facet">9</div>
          <div className="facet">10</div>
          <div className="facet">11</div>
          <div className="facet">12</div>
          <div className="facet">13</div>
          <div className="facet">14</div>
          <div className="facet">15</div>
          <div className="facet">16</div>
          <div className="facet">17</div>
          <div className="facet">18</div>
          <div className="facet">19</div>
          <div className="facet">20</div>
          <div className="facet">21</div>
          <div className="facet">22</div>
          <div className="facet">23</div>
          <div className="facet">24</div>
          <div className="facet">25</div>
          <div className="facet">26</div>
          <div className="facet">27</div>
          <div className="facet">28</div>
          <div className="facet">29</div>
          <div className="facet">30</div>
          <div className="facet">31</div>
          <div className="facet">32</div>
          <div className="facet">33</div>
          <div className="facet">34</div>
          <div className="facet">35</div>
          <div className="facet">36</div>
          <div className="facet">37</div>
          <div className="facet">38</div>
          <div className="facet">39</div>
          <div className="facet">40</div>
          <div className="facet">41</div>
          <div className="facet">42</div>
          <div className="facet">43</div>
          <div className="facet">44</div>
          <div className="facet">45</div>
          <div className="facet">46</div>
          <div className="facet">47</div>
          <div className="facet">48</div>
          <div className="facet">49</div>
          <div className="facet">50</div>
          <div className="facet">51</div>
          <div className="facet">52</div>
          <div className="facet">53</div>
          <div className="facet">54</div>
          <div className="facet">55</div>
          <div className="facet">56</div>
          <div className="facet">57</div>
          <div className="facet">58</div>
          <div className="facet">59</div>
          <div className="facet">60</div>
        </div>
        <div
          className={`bottomHorizontalPlane ${bottomClassName}`}
          onClick={() => {
            rotateEvent("protoShiftBottom");
          }}
        >
          <div className="facet">1</div>
          <div className="facet">2</div>
          <div className="facet">3</div>
          <div className="facet">4</div>
          <div className="facet">5</div>
          <div className="facet">6</div>
          <div className="facet">7</div>
          <div className="facet">8</div>
          <div className="facet">9</div>
          <div className="facet">10</div>
          <div className="facet">11</div>
          <div className="facet">12</div>
          <div className="facet">13</div>
          <div className="facet">14</div>
          <div className="facet">15</div>
          <div className="facet">16</div>
          <div className="facet">17</div>
          <div className="facet">18</div>
          <div className="facet">19</div>
          <div className="facet">20</div>
          <div className="facet">21</div>
          <div className="facet">22</div>
          <div className="facet">23</div>
          <div className="facet">24</div>
          <div className="facet">25</div>
          <div className="facet">26</div>
          <div className="facet">27</div>
          <div className="facet">28</div>
          <div className="facet">29</div>
          <div className="facet">30</div>
          <div className="facet">31</div>
          <div className="facet">32</div>
          <div className="facet">33</div>
          <div className="facet">34</div>
          <div className="facet">35</div>
          <div className="facet">36</div>
          <div className="facet">37</div>
          <div className="facet">38</div>
          <div className="facet">39</div>
          <div className="facet">40</div>
          <div className="facet">41</div>
          <div className="facet">42</div>
          <div className="facet">43</div>
          <div className="facet">44</div>
          <div className="facet">45</div>
          <div className="facet">46</div>
          <div className="facet">47</div>
          <div className="facet">48</div>
          <div className="facet">49</div>
          <div className="facet">50</div>
          <div className="facet">51</div>
          <div className="facet">52</div>
          <div className="facet">53</div>
          <div className="facet">54</div>
          <div className="facet">55</div>
          <div className="facet">56</div>
          <div className="facet">57</div>
          <div className="facet">58</div>
          <div className="facet">59</div>
          <div className="facet">60</div>
        </div>
      </div>
    </div>
  );
};

export default ProtoRotation;
