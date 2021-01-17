import React from "react";
import { Button } from "./Button";
import { Profile } from "../types";

export const PaginationButtons: React.FC<{
  data: { hasMore: boolean; data: Profile[] };
  cursor: number;
  setCursor: any;
  nextPage: (amount: number) => void;
  prevPage: (amount: number) => void;
  scroll?: boolean;
  pageNumber: number;
}> = ({ cursor, nextPage, prevPage, data, scroll, pageNumber }) => {
  const handleClick = (cb: any) => {
    if (scroll) {
      window.scrollTo({
        top: document.getElementById("card-list")!.offsetTop - 50,
        behavior: "smooth",
      });
    }
    cb();
  };
  return (
    <div className=" container mx-auto mt-10 text-center">
      <Button
        className="mr-4"
        type="primary"
        disabled={cursor <= 0}
        onClick={() => handleClick(prevPage)}
      >
        Back
      </Button>
      <span className=" mr-4">{pageNumber}</span>
      <Button
        type="primary"
        disabled={!data.hasMore}
        onClick={() => handleClick(nextPage)}
      >
        Next
      </Button>
    </div>
  );
};
