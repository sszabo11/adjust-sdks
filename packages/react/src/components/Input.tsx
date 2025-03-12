import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => (
  <input
    value={value}
    onChange={onChange}
    style={{ padding: "10px", border: "1px solid #ccc" }}
  />
);

export default Input;
