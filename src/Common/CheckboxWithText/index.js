import React from "react";
import "./checkboxWithText.scss";

const CheckboxWithText = (props) => {
  const { title, disabled, selected, handleOnChangeInput } = props;

  return (
    <div className="checkbox-with-text">
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={handleOnChangeInput}
        className={
          "checkbox-with-text-input " +
          (selected ? "checkbox-with-text-input-selected" : "")
        }
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      <div className="checkbox-with-text-value">{title}</div>
    </div>
  );
};

export default CheckboxWithText;
