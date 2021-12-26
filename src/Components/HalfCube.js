import "../styles/HalfCube.css";
import { useEffect, useRef } from "react";

const Cube = () => {
  const cube = useRef(null);

  useEffect(() => {
    console.log(`Top: ${cube.current.getBoundingClientRect().top}`);
  }, []);

  return (
    <div className="middle">
      <div className="cubetainer" ref={cube}>
        <div className="side">1</div>
        <div className="side">2</div>
        <div className="side">3</div>
      </div>
    </div>
  );
};

export default Cube;
