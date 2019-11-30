import React from "react";
const Button = ({ name, clicked }) => (
  <button className="btn" onClick={clicked}>
    {name}
  </button>
);
export default Button;
