import React from "react";
import "./customButton.scss";

const CustomButton = (props) => {
  const { label, disabled, handleCustomButton } = props;
  return (
    <div
      className={
        "custom-button-container " +
        (disabled ? "custom-button-container-disabled" : "")
      }
      disabled={disabled}
      onClick={() => (disabled ? "" : handleCustomButton())}
    >
      {label}
    </div>
  );
};

export default CustomButton;
