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
        className="focus:ring-2 ring-opacity-50 focus:w-80 w-60 focus:border-transparent ring-purple-700 focus:outline-none inline-block p-2 duration-300 border border-gray-400 rounded-md"
        type="search"
        placeholder="Search Patient..."
        name="patient-name"
      />
    </div>
  );
};

export default SearchBar;
