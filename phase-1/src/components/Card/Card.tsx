import React, { useEffect, useRef, useState } from "react";
import { PaymentMethodMap, Profile } from "../../types";
import { BsX, BsArrowRight } from "react-icons/bs";
import { centerCard } from "../../utils/centerCard";
import { Attribute } from "./CardAttribute";
import { Button } from "../Button";
import { CardHead } from "./CardHead";

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
      <div
        ref={cardRef}
        className={`${
          show
            ? "show bg-black overflow-y-auto h-.9screen max-h-card sm:w-card sm:hover:bg-gray-900 z-50"
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
          {show ? (
            <>
              <div className="mb-5">
                <CardHead title="Basic Info" />
                <Attribute value={profile.FirstName} name="First name" />
                <Attribute value={profile.LastName} name="Last name" />
                <Attribute value={profile.UserName} name="Username" />
                <Attribute value={profile.PhoneNumber} name="Phone number" />
                <Attribute value={profile.Email} name="Email" />
                <Attribute value={profile.Gender} name="Gender" />
              </div>
              <HR />
              <div className="mt-5 mb-5">
                <CardHead title="Payment Info" />
                <Attribute
                  value={profile.CreditCardNumber}
                  name="Credit card no"
                />
                <Attribute
                  value={profile.CreditCardType}
                  name="Credit Card Type"
                />
                <Attribute
                  value={PaymentMethodMap[profile.PaymentMethod]}
                  name="Payment Method"
                />
              </div>
              <HR />

              <div className="mt-5 mb-5">
                <CardHead title="Links" />
                <Attribute value={profile.URL} name="URL" />
                <Attribute value={profile.DomainName} name="Domain Name" />
              </div>
              <HR />

              <div className="mt-5">
                <CardHead title="Location" />
                <Attribute value={profile.MacAddress} name="MAC Dddress" />
                <Attribute value={profile.Latitude} name="Latitude" />
                <Attribute value={profile.Longitude} name="Longitude" />
              </div>
            </>
          ) : (
            <>
              <Attribute value={profile.Email} name={"Email"} />
              <Attribute value={profile.Gender} name={"Gender"} />
              <Attribute
                value={PaymentMethodMap[profile.PaymentMethod]}
                name={"Payment Method"}
              />
            </>
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

const HR = () => <div style={{ height: 1 }} className="bg-gray-700" />;

export default Card;
