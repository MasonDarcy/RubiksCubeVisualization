import React, { useState, useRef, useEffect } from "react";
import "../styles/Sample.css";

function SampleAnimation() {
  const [className, setClassName] = useState(null);
  const [position, setPosition] = useState(1);
  const el = useRef(null);
  let fired = useRef(false);

  const move = () => {
    setClassName("animate");
    setTimeout(() => {
      setPosition(2);
    }, 3000);
  };

  useEffect(() => {
    if (fired.current) {
      el.current.style.setProperty(`--color2`, "green");
      el.current.style.setProperty(`--color1`, "blueviolet");
      setClassName(null);
      console.log("lol");
    } else {
      fired.current = true;
    }
  }, [position]);

  const eventCallbackExample = () => {
    //Update state
    setPosition(2);
    //After delay
    setTimeout(() => {
      //Apply CSS styles based on the new state
    }, 3000);
  };

  return (
    <div
      ref={el}
      className="outerBox"
      onClick={() => {
        move();
      }}
    >
      <div className={`firstPosition ${className}`}></div>
      <div className="secondPosition"></div>
    </div>
  );
}

export default SampleAnimation;
