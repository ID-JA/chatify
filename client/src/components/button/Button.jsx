import React from "react";
import "./Button.scss";

const Button = ({ color, text, stretch }) => {
  return (
    <button
      type="button"
      className={`button ${color} ${stretch ? "stretch" : ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
