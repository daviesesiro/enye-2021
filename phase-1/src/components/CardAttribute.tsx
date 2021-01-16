import React from "react";
import { BsCaretRightFill } from "react-icons/bs";

export const Attribute = ({ name, value }: { name: string; value: string }) => {
  value = name === "LastLogin" ? new Date(value).toDateString() : value;
  let body =
    name === "URL" || name === "DomainName" ? (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-purple-600"
        href={value}
      >
        {value}
      </a>
    ) : (
      <span>{value}</span>
    );

  return (
    <div className="sm:block sm:py-1 flex flex-col items-center">
      <BsCaretRightFill className=" sm:inline hidden mr-4 text-purple-500" />
      <span className="sm:mt-0 mt-2 font-bold text-gray-500">{name}: </span>
      {body}
    </div>
  );
};
