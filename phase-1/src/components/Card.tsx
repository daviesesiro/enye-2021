import React, { useEffect, useRef, useState } from "react";
import { Profile } from "../types";
import { BsCaretRightFill, BsX, BsArrowRight } from "react-icons/bs";
import { centerCard } from "../utils/centerCard";

const Card: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scrollListenter = () => centerCard(cardRef.current as HTMLDivElement);
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
          className="fixed inset-0 z-40 w-screen h-screen bg-black opacity-50"
        ></button>
      )}
      <div
        ref={cardRef}
        className={`${
          show
            ? "z-50 md:w-max h-screen md:h-auto overflow-y-scroll md:overflow-y-auto"
            : ""
        }  group card`}
      >
        {show && (
          <button onClick={() => setShow(false)}>
            <BsX size={30} className="text-red-700" />
          </button>
        )}
        <h1 className="text-xl text-center">{`${profile.FirstName} ${profile.LastName}`}</h1>
        <div className="md:px-5 px-2 mt-8 font-light text-gray-300">
          <Attribute value={profile.Email} name={"Email"} />
          <Attribute value={profile.Gender} name={"Gender"} />
          <Attribute value={profile.PaymentMethod} name={"Payment Method"} />
          {show &&
            Object.entries(profile).map(([key, value]) => {
              if (
                [
                  "Gender",
                  "PaymentMethod",
                  "Email",
                  "FirstName",
                  "LastName",
                ].includes(key)
              )
                return <></>;

              return <Attribute value={value.toString()} name={key} />;
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
  <p className="md:block flex flex-col items-center leading-6">
    <BsCaretRightFill className=" md:inline hidden mr-4 text-purple-500" />
    <span className="md:mt-0 mt-2 font-bold text-gray-500">{name}:</span>{" "}
    {value}
  </p>
);

export default Card;
