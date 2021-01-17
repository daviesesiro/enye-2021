import React from "react";

const SearchBar = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <input
        onChange={onChange}
        className="search w-full"
        type="search"
        placeholder="Search Patient..."
        name="patient-name"
      />
    </div>
  );
};

export default SearchBar;
