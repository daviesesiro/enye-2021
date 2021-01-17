import { FiArrowUp } from "react-icons/fi";

import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "./Button";

export const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY >= 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  }, [setShow]);

  return (
    <Button
      type="primary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="bottom-10 right-5 fixed p-4"
      style={
        show
          ? { visibility: "visible", opacity: 1 }
          : { visibility: "hidden", opacity: 0 }
      }
    >
      <FiArrowUp color="white" />
    </Button>
  );
};
