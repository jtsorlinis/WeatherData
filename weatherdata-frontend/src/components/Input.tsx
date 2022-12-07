import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange }) => (
  <div className="textField">
    <label htmlFor={name}>{label}: </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange} // should ideally be debounced
    />
  </div>
);

export default Input;
