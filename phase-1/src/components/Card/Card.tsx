import React, { useEffect, useRef, useState } from "react";
import { Profile } from "../../types";
import { BsX, BsArrowRight } from "react-icons/bs";
import { centerCard } from "../../utils/centerCard";
import { Button } from "../Button";
import { FullCardDetails, PreviewCardDetails } from "./CardDetails";

const Card: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const closeCard = (threshold: number) => {
    if (Math.abs(threshold) > 400) setShow(false);
  };

  useEffect(() => {
    const scrollListenter = () => {
      centerCard(cardRef.current as HTMLDivElement, closeCard);
    };
    if (show) {
      centerCard(cardRef.current as HTMLDivElement);
      window.addEventListener("scroll", scrollListenter);
    } else {
      cardRef.current!.style.transform = "translate(0)";
    }

    return () => window.removeEventListener("scroll", scrollListenter);
  }, [show]);

  return (
    <>
      {show && (
        <button
          onClick={() => setShow(false)}
          className="opacity-60 fixed inset-0 z-40 w-screen bg-black"
        ></button>
      )}
      <div ref={cardRef} className={`${show ? "open " : ""} group card`}>
        {show && (
          <button
            className="top-5 left-5 absolute"
            onClick={() => setShow(false)}
          >
            <BsX size={30} className="text-red-700" />
          </button>
        )}
        <h1 className="text-xl text-center">
          {show ? `${profile.FirstName}'s Details` : profile.FullName}
        </h1>
        <div className="sm:px-5 px-2 mt-8 font-light text-gray-300">
          {show ? (
            <FullCardDetails profile={profile} />
          ) : (
            <PreviewCardDetails profile={profile} />
          )}
        </div>
        {!show && (
          <Button
            type="secondary"
            onClick={() => setShow(true)}
            className="group-hover:text-purple-50 group-hover:bg-purple-700 block mx-auto mt-8"
          >
            View More <BsArrowRight className="inline" />
          </Button>
        )}
      </div>
    </>
  );
};

export const HR = () => <div style={{ height: 1 }} className="bg-gray-700" />;

export default Card;
