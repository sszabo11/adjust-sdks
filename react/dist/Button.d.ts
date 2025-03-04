import React from "react";
interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}
export default function Button({ onClick, children }: ButtonProps): React.JSX.Element;
export {};
