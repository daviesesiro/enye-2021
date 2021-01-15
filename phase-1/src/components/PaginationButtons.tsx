import React from "react";
import { Button } from "./Button";
import { Profile } from "../types";

export const PaginationButtons: React.FC<{
  data: { hasMore: boolean; data: Profile[] };
  cursor: number;
  setCursor: any;
  icr: (amount: number) => void;
  dcr: (amount: number) => void;
}> = ({ cursor, icr, dcr, data }) => {
  return (
    <div className=" container mx-auto mt-10 text-center text-white">
      <Button className="mr-4" disabled={cursor <= 0} onClick={icr}>
        Back
      </Button>
      <Button disabled={!data.hasMore} onClick={dcr}>
        Next
      </Button>
    </div>
  );
};
