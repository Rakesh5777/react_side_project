import React from "react";
import "./mainContent.scss";
import CustomButton from "../CustomButton";

const MainContent = (props) => {
  const {
    titleImg,
    title,
    subtitle,
    buttonLabel,
    disabled,
    handleCustomButton,
  } = props;
  return (
    <div className="main-content-container">
      {titleImg && (
        <div className="main-content-title-img-container">
          <img alt="" src={titleImg} className="main-content-title-img" />
        </div>
      )}
      {title && <div className="main-content-title">{title}</div>}
      {subtitle && <div className="main-content-subtitle">{subtitle}</div>}
      {buttonLabel && (
        <div className="main-content-custom-button">
          <CustomButton
            label={buttonLabel}
            disabled={disabled}
            handleCustomButton={handleCustomButton}
          />
        </div>
      )}
    </div>
  );
};

export default MainContent;
