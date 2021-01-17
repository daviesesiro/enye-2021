import React from "react";

export const Dropdown = ({
  handleChange,
}: {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select
      defaultValue="All"
      defaultChecked={true}
      onChange={handleChange}
      name="payment-method"
      className="focus:ring-2 focus:outline-none ring-opacity-50 ring-purple-700 px-4 py-1 mt-1 border border-gray-400 rounded-md"
      id="payment-method"
    >
      <option>All</option>
      <option value="cc">Credit Card </option>
      <option value="money order">Money Order</option>
      <option value="paypal">Paypal</option>
      <option value="check">Check</option>
    </select>
  );
};
