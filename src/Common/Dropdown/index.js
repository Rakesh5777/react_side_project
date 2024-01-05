import React, { useState } from "react";
import "./dropdown.scss";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import infoIcon from "../../assets/infoIcon.svg";
import { ClickAwayListener } from "@mui/material";
import Popover from "@mui/material/Popover";
import closeIcon from "../../assets/closeIcon.svg";

const Dropdown = (props) => {
  const {
    title,
    mandatory,
    disabled,
    titleInfoHoverMsg,
    titleInfoHoverMsgPosition,
    selectedValue,
    options,
    handleSelectDropdown,
  } = props;

  const [openDropdown, setOpenDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayDropdownTitle = () => {
    return (
      <>
        {title && (
          <div className="dropdown-title">
            {title}
            {mandatory && (
              <span className="dropdown-title-asterick">{" *"}</span>
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
                  <div className="dropdown-popover-main-content">
                    <div className="dropdown-popover-content">
                      {titleInfoHoverMsg}
                    </div>
                    <div className="dropdown-popover-close-icon">
                      <img alt="" src={closeIcon} onClick={handleClose} />
                    </div>
                  </div>
                </Popover>
              </>
            )}
          </div>
        )}
      </>
    );
  };

  const displayDropdownUI = () => {
    return (
      <div
        className="dropdown-cont"
        onClick={() => (!disabled ? handleToggleDropdown() : "")}
        style={{ cursor: disabled ? "not-allowed" : "" }}
      >
        <div className="dropdown-selected-value">
          {selectedValue ? selectedValue : "Select Option"}
        </div>
        <img
          alt=""
          src={dropdownArrow}
          className={
            "dropdown-arrow " +
            (openDropdown ? "dropdown-expand" : "dropdown-collapse")
          }
        />
      </div>
    );
  };

  const displayDropdownOptions = () => {
    return (
      <ClickAwayListener onClickAway={handleToggleDropdown}>
        <div className="dropdown-options-container">
          {options.map((item, ind) => (
            <div
              className="dropdown-options-values"
              key={ind}
              onClick={() => {
                handleSelectDropdown(item);
                handleToggleDropdown();
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </ClickAwayListener>
    );
  };

  return (
    <div className="dropdown-container">
      {displayDropdownTitle()}
      {displayDropdownUI()}
      {openDropdown && displayDropdownOptions()}
    </div>
  );
};

export default Dropdown;
