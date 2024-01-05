import React, { useState } from "react";
import "./formInputWithTitle.scss";
import infoIcon from "../../assets/infoIcon.svg";
import Popover from "@mui/material/Popover";
import closeIcon from "../../assets/closeIcon.svg";

const FormInputWithTitle = (props) => {
  const {
    title,
    type,
    placeholder,
    value,
    disbaled,
    mandatory,
    errorMsg,
    allowDecimal,
    titleInfoHoverMsg,
    titleInfoHoverMsgPosition,
    handleOnChangeInput,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleKeyDown = (e) => {
    if (type === "number") {
      if (
        e.key === "+" ||
        e.key === "-" ||
        e.key?.toLowerCase() === "e" ||
        (!allowDecimal && e.key === ".")
      ) {
        e.preventDefault();
      }
    } else if (!type || type === "string") {
      let regexp = /^[a-zA-Z0-9-_]+$/;
      if (!regexp.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="form-input-with-title-container">
      {title && (
        <div className="form-input-with-title">
          {title}
          {mandatory && (
            <span className="form-input-with-title-asterick">{" *"}</span>
          )}
          {titleInfoHoverMsg && (
            <>
              <img
                alt=""
                src={infoIcon}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: titleInfoHoverMsgPosition ?? "bottom",
                  horizontal: "center",
                }}
              >
                <div className="form-input-popover-main-content">
                  <div className="form-input-popover-content">
                    {titleInfoHoverMsg}
                  </div>
                  <div className="form-input-popover-close-icon">
                    <img alt="" src={closeIcon} onClick={handleClose} />
                  </div>
                </div>
              </Popover>
            </>
          )}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disbaled={disbaled}
        onChange={handleOnChangeInput}
        onKeyDown={(e) => handleKeyDown(e)}
        className={
          "form-input-with-title-input " +
          (errorMsg ? "form-input-with-title-input-error" : "")
        }
      />
      {errorMsg && (
        <div className="form-input-with-title-input-error-msg">{errorMsg}</div>
      )}
    </div>
  );
};

export default FormInputWithTitle;
