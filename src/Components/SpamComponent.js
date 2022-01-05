import React, { useRef, useCallback } from "react";
import debounce from "lodash.debounce";

function SpamComponent() {
  const busy = useRef(false);

  const fire = () => {
    console.log("fired");
    if (!busy.current) {
      console.log("fired inside");
      doJob();
    }
  };

  const debouncedRelease = useCallback(
    debounce(fire, 1000),
    [] // will be created only once initially
  );

  const doJob = () => {
    busy.current = true;

    setTimeout(() => {
      console.log("Job's done.");
      busy.current = false;
    }, 1000);
  };

  return <div onMouseDown={debouncedRelease}>Waow</div>;
}

export default SpamComponent;
