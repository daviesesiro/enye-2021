import React from "react";
import Card from "./Card";
import { PaginatedData } from "../../types";

export const CardList = ({
  paginatedProfiles,
}: {
  paginatedProfiles: PaginatedData;
}) => {
  return (
    <div id="card-list" className="card-list mt-10">
      {paginatedProfiles.data.map((profile) => (
        <Card key={profile.Email} profile={profile} />
      ))}
    </div>
  );
};
