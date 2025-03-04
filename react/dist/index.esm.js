import React from 'react';

function handleClick() {
    console.log("shared things");
}

function Button({ onClick, children }) {
    function Click() {
        console.log("react");
        handleClick();
        onClick && onClick();
    }
    return (React.createElement("button", { onClick: Click, style: { padding: "10px 20px", border: "1px solid #ccc" } }, children));
}

const Input = ({ value, onChange }) => (React.createElement("input", { value: value, onChange: onChange, style: { padding: "10px", border: "1px solid #ccc" } }));

export { Button, Input };
//# sourceMappingURL=index.esm.js.map
