import React from "react";

function SingleCube({ info, handler }) {
  return (
    <>
      <div
        id={info[0]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>
      <div
        id={info[1]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>

      <div
        id={info[2]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>
      <div
        id={info[3]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>
      <div
        id={info[4]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>
      <div
        id={info[5]}
        onMouseDown={(e) => {
          handler(e);
          e.stopPropagation();
        }}
      ></div>
    </>
  );
}

export default SingleCube;
