import React, { useRef, useEffect, useState } from "react";
import "../styles/buttonStyle.css";

function ButtonProto({ handler, status }) {
  const universeRef = useRef(null);

  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const buttonRef5 = useRef(null);
  const buttonRef6 = useRef(null);
  const buttonRef7 = useRef(null);
  const buttonRef8 = useRef(null);
  const buttonRef9 = useRef(null);

  const refArray = [
    buttonRef,
    buttonRef2,
    buttonRef3,
    buttonRef4,
    buttonRef5,
    buttonRef6,
    buttonRef7,
    buttonRef8,
    buttonRef9,
  ];

  const [reverse, setReverse] = useState("");
  const [reverse2, setReverse2] = useState("");
  const [reverse3, setReverse3] = useState("");
  const [reverse4, setReverse4] = useState("");
  const [reverse5, setReverse5] = useState("");
  const [reverse6, setReverse6] = useState("");
  const [reverse7, setReverse7] = useState("");
  const [reverse8, setReverse8] = useState("");
  const [reverse9, setReverse9] = useState("");

  const animationSpeed = 400;
  const timer = useRef(null);
  const exitTimer = useRef(null);
  const gamut = useRef(0);

  const mentor = (e) => {
    console.log("mentor");
    if (gamut.current == 0) {
      refArray.forEach((ref) => {
        ref.current.style.setProperty("animation-delay", `${0}ms`);
      });
    } else {
      let differential = Math.floor(performance.now() - exitTimer.current);
      gamut.current - differential < 0
        ? (gamut.current = 0)
        : (gamut.current -= differential);

      refArray.forEach((ref) => {
        ref.current.style.setProperty("animation-delay", `-${gamut.current}ms`);
      });
    }
    timer.current = performance.now();
  };

  const mleave = (e) => {
    console.log("mouseleave called");

    let animationDifferential = Math.floor(performance.now() - timer.current);
    gamut.current += animationDifferential;

    if (gamut.current >= animationSpeed) gamut.current = animationSpeed;

    refArray.forEach((ref) => {
      ref.current.style.setProperty(
        "animation-delay",
        `-${animationSpeed - animationDifferential}ms`
      );
    });

    setReverse("reverse");
    setReverse2("reverse2");
    setReverse3("reverse3");
    setReverse4("reverse3");
    setReverse5("reverse2");
    setReverse6("reverse");
    setReverse7("reverse4");
    setReverse8("reverse3");
    setReverse9("reverse");

    exitTimer.current = performance.now();
  };

  useEffect(() => {
    // window.addEventListener("animationstart", animstart, false);
    // window.addEventListener("animationend", animend, false);
    universeRef.current.addEventListener("mouseleave", mleave, false);
    universeRef.current.addEventListener("mouseenter", mentor, false);

    return () => {
      // window.removeEventListener("animationstart", animstart);
      // window.removeEventListener("animationend", animend);
      universeRef.current.removeEventListener("mouseleave", mleave);
      universeRef.current.removeEventListener("mouseenter", mentor);
    };
  });

  return (
    <>
      <div className={status.current ? "disableBox" : ""}></div>
      <div
        className="randomizerButton"
        ref={universeRef}
        onClick={(e) => {
          if (!status.current) {
            console.log(handler);
            //Visually disable the button somehow for the duration.
            status.current = true;
            handler(e);
            console.log("done");
          }
        }}
      >
        <div className={`child1 ${reverse}`} ref={buttonRef}></div>
        <div className={`child2 ${reverse2}`} ref={buttonRef2}></div>
        <div className={`child3 ${reverse3}`} ref={buttonRef3}></div>
        <div className={`child4 ${reverse4}`} ref={buttonRef4}></div>
        <div className={`child5 ${reverse5}`} ref={buttonRef5}></div>
        <div className={`child6 ${reverse6}`} ref={buttonRef6}></div>
        <div className={`child7 ${reverse7}`} ref={buttonRef7}></div>
        <div className={`child8 ${reverse8}`} ref={buttonRef8}></div>
        <div className={`child9 ${reverse9}`} ref={buttonRef9}></div>
      </div>
    </>
  );
}

export default ButtonProto;
