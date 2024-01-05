import React from "react";
import "./radioButtonWithText.scss";

const RadioButtonWithText = (props) => {
  const { title, disabled, selected, handleOnChangeInput } = props;

  return (
    <div className="radio-button-with-text">
      <input
        type="radio"
        checked={selected}
        disabled={disabled}
        onChange={handleOnChangeInput}
        className={
          "radio-button-with-text-input " +
          (selected ? "radio-button-with-text-input-selected" : "")
        }
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      <div className="radio-button-with-text-value">{title}</div>
    </div>
  );
};

export default RadioButtonWithText;
