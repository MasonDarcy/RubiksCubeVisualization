import React, { useRef } from "react";
import "../styles/randomButtonStyle.css";

function ButtonRandom({ handler, status }) {
  const universeRef = useRef(null);

  return (
    <>
      <div className={status.current ? "disableBox2" : ""}></div>
      <div
        className="randomizerButton2"
        ref={universeRef}
        onClick={(e) => {
          handler(e);
        }}
      >
        <div className="childr1"></div>
        <div className="childr2"></div>
        <div className="childr3"></div>
        <div className="childr4"></div>
        <div className="childr5"></div>
        <div className="childr6"></div>
        <div className="childr7"></div>
        <div className="childr8"></div>
        <div className="childr9"></div>
      </div>
    </>
  );
}

export default ButtonRandom;
