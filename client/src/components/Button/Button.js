import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`button ${props.disabled ? "disabled" : ""} ${
        props.class ? props.class : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
