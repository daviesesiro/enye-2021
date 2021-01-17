import React from "react";
import { PaymentMethodMap, Profile } from "../../types";
import { Attribute } from "./CardAttribute";
import { CardHead } from "./CardHead";
import { HR } from "./Card";

export const FullCardDetails = ({ profile }: { profile: Profile }) => {
  return (
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
        <Attribute value={profile.CreditCardNumber} name="Credit card no" />
        <Attribute value={profile.CreditCardType} name="Credit Card Type" />
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
  );
};

export const PreviewCardDetails = ({ profile }: { profile: Profile }) => (
  <>
    <Attribute value={profile.Email} name={"Email"} />
    <Attribute value={profile.Gender} name={"Gender"} />
    <Attribute
      value={PaymentMethodMap[profile.PaymentMethod]}
      name={"Payment Method"}
    />
  </>
);
