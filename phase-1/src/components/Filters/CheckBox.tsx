import React from "react";

const CheckBox: React.FC<{
  label: string;
  className: string;
  value?: any;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, id, className, onChange, value }) => (
  <div className={"inline " + className}>
    <input
      onChange={onChange}
      className="w-5 h-5 align-middle"
      type="checkbox"
      id={id}
      name={label}
      value={value}
    />
    <label htmlFor={id} className="ml-2 align-middle">
      {label}
    </label>
  </div>
);

export const CheckBoxes = ({
  handleCheckBoxChange,
}: {
  handleCheckBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const checkboxesData = [
    {
      label: "Male",
      value: "Male",
      id: "male",
    },
    {
      label: "Female",
      value: "Female",
      id: "female",
    },
    {
      label: "Prefer to Skip",
      value: "Prefer to Skip",
      id: "prefer-to-skip",
    },
  ];
  return (
    <div>
      {checkboxesData.map((data, idx) => (
        <CheckBox
          key={"checkbox-" + idx}
          value={data.value}
          id={data.id}
          onChange={handleCheckBoxChange}
          label={data.label}
          className="mr-3"
        />
      ))}
    </div>
  );
};
