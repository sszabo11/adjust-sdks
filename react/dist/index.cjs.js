'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function handleClick() {
    console.log("shared things");
}

function Button({ onClick, children }) {
    function Click() {
        console.log("react");
        handleClick();
        onClick && onClick();
    }
    return (React__default["default"].createElement("button", { onClick: Click, style: { padding: "10px 20px", border: "1px solid #ccc" } }, children));
}

const Input = ({ value, onChange }) => (React__default["default"].createElement("input", { value: value, onChange: onChange, style: { padding: "10px", border: "1px solid #ccc" } }));

exports.Button = Button;
exports.Input = Input;
//# sourceMappingURL=index.cjs.js.map
