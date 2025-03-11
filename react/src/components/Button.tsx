import { handleClick } from "adjust-core";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  function Click() {
    console.log("reactt");
    handleClick();
    onClick && onClick();
  }

  return (
    <button
      onClick={Click}
      style={{ padding: "10px 20px", border: "1px solid #ccc" }}
    >
      {children}
    </button>
  );
}
