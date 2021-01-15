import React, { useEffect, useRef, useState } from "react";
import { Profile } from "../types";
import { BsCaretRightFill, BsX, BsArrowRight } from "react-icons/bs";
import { centerCard } from "../utils/centerCard";

const Card: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);

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
      cardRef.current!.style.transform = "translateX(0)";
    }

    return () => window.removeEventListener("scroll", scrollListenter);
  }, [show]);

  return (
    <>
      {show && (
        <button
          onClick={() => setShow(false)}
          className="fixed inset-0 z-40 w-screen bg-black opacity-50"
        ></button>
      )}
      <div
        ref={cardRef}
        className={`${
          show
            ? "z-50 sm:w-max relative max-h-card h-.8screen sm:h-auto overflow-y-auto sm:overflow-y-auto"
            : ""
        }  group card`}
      >
        {show && (
          <button
            className="top-5 left-5 absolute"
            onClick={() => setShow(false)}
          >
            <BsX size={30} className="text-red-700" />
          </button>
        )}
        <h1 className="text-xl text-center">{`${profile.FirstName} ${profile.LastName}`}</h1>
        <div className="sm:px-5 px-2 mt-8 font-light text-gray-300">
          <Attribute value={profile.Email} name={"Email"} />
          <Attribute value={profile.Gender} name={"Gender"} />
          <Attribute value={profile.PaymentMethod} name={"Payment Method"} />
          {show &&
            Object.entries(profile)
              .filter(
                ([key, _]) =>
                  ![
                    "Gender",
                    "PaymentMethod",
                    "Email",
                    "FirstName",
                    "LastName",
                  ].includes(key)
              )
              .map(([key, value], idx) => {
                return (
                  <Attribute
                    key={profile.FirstName + "-atr-" + idx}
                    value={value.toString()}
                    name={key}
                  />
                );
              })}
        </div>
        {!show && (
          <button
            ref={ButtonRef}
            onClick={() => setShow(true)}
            className="group-hover:text-purple-50 group-hover:bg-purple-700 rounded-xs block px-2 py-1 mx-auto mt-8 text-purple-900 duration-200 bg-gray-200 rounded-sm"
          >
            View More <BsArrowRight className="inline" />
          </button>
        )}
      </div>
    </>
  );
};

const Attribute = ({ name, value }: { name: string; value: string }) => (
  <p className="sm:block flex flex-col items-center">
    <BsCaretRightFill className=" sm:inline hidden mr-4 text-purple-500" />
    <span className="sm:mt-0 mt-2 font-bold text-gray-500">{name}:</span>{" "}
    {value}
  </p>
);

export default Card;
