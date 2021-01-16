import React from "react";

const SearchBar = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex justify-center mt-5">
      <input
        onChange={onChange}
        className="search"
        type="search"
        placeholder="Search Patient..."
        name="patient-name"
      />
    </div>
  );
};

export default SearchBar;
