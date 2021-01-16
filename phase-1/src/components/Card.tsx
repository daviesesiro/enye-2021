import React, { useEffect, useRef, useState } from "react";
import { PaymentMethodMap, Profile } from "../types";
import { BsX, BsArrowRight } from "react-icons/bs";
import { centerCard } from "../utils/centerCard";
import { Attribute } from "./CardAttribute";

const Card: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const closeCard = (threshold: number) => {
    if (Math.abs(threshold) > 400) setShow(false);
  };

  const getRemainingAttrs = () =>
    Object.entries(profile).filter(
      ([key, _]) =>
        ![
          "Gender",
          "PaymentMethod",
          "Email",
          "FirstName",
          "LastName",
          "FullName",
        ].includes(key)
    );

  useEffect(() => {
    const scrollListenter = () => {
      centerCard(cardRef.current as HTMLDivElement, closeCard);
    };
    if (show) {
      centerCard(cardRef.current as HTMLDivElement);
      window.addEventListener("scroll", scrollListenter);
    } else {
      cardRef.current!.style.transform = "translate(0)";
      setTimeout(() => {
        cardRef.current!.style.zIndex = "unset";
      }, 200);
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
      <div
        ref={cardRef}
        className={`${
          show
            ? "bg-gray-900 sm:w-max relative max-h-card h-.8screen sm:h-auto overflow-y-auto sm:overflow-y-auto"
            : ""
        } group card`}
      >
        {show && (
          <button
            className="top-5 left-5 absolute"
            onClick={() => setShow(false)}
          >
            <BsX size={30} className="text-red-700" />
          </button>
        )}
        <h1 className="text-xl text-center">{profile.FullName}</h1>
        <div className="sm:px-5 px-2 mt-8 font-light text-gray-300">
          <Attribute value={profile.Email} name={"Email"} />
          <Attribute value={profile.Gender} name={"Gender"} />
          <Attribute
            value={PaymentMethodMap[profile.PaymentMethod]}
            name={"Payment Method"}
          />
          {show &&
            getRemainingAttrs().map(([key, value]) => {
              return (
                <Attribute
                  key={profile.Email + "-atr-" + key}
                  value={value.toString()}
                  name={key}
                />
              );
            })}
        </div>
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="group-hover:text-purple-50 group-hover:bg-purple-700 btn btn-secondary block mx-auto mt-8"
          >
            View More <BsArrowRight className="inline" />
          </button>
        )}
      </div>
    </>
  );
};

export default Card;
