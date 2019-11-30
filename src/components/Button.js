import React from "react";
const Button = ({ name, clicked }) => (
  <button id="new-quote" className="btn" onClick={clicked}>
    {name}
  </button>
);
export default Button;
