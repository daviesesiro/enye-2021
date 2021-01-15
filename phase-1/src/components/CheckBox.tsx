import React from "react";

export const CheckBox: React.FC<{
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
