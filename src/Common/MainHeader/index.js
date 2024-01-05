import React from "react";
import "./mainHeader.scss";

const MainHeader = ({ header }) => {
  return (
    <div className="main-header-container">
      <div className="main-header-text">{header}</div>
    </div>
  );
};

export default MainHeader;
