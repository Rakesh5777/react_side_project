import React, { useState, useEffect } from "react";
import "./sideBar.scss";
import { SIDEBAR_LIST } from "./constants";
import wayamLogo from "../../assets/wayamLogo-s.svg";
import wayamLogoText from "../../assets/wayamLogoText-s.svg";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarList, setSidebarList] = useState(SIDEBAR_LIST);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    handleSelectedPath();
  }, [location.pathname]);

  const handleSelectedPath = () => {
    let list = [...sidebarList];
    list.forEach((ele) => {
      ele.expand = false;
      if (ele.subtitle?.length !== 0) {
        ele.subtitle.forEach((item) => {
          if (item.path === location.pathname) {
            ele.expand = true;
          }
        });
      }
    });
    setSidebarList([...list]);
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleToggleMenu = (item) => {
    let ind = sidebarList.findIndex((ele) => ele.title === item.title);
    sidebarList[ind].expand = !sidebarList[ind].expand;
    setSidebarList([...sidebarList]);
  };

  const displaySidebarMenu = (item) => {
    let subtitlePaths = [];

    if (item?.subtitle?.length !== 0) {
      subtitlePaths = item.subtitle.map((ele) => {
        return ele.path;
      });
    }

    let isSelected = location.pathname.includes(item.path);
    let isMainSelected = subtitlePaths.includes(location.pathname);

    return (
      <div
        key={item.id}
        className={
          "sidebar-main-content " +
          (item.title === "Settings" ? "sidebar-main-content-settings " : "") +
          (isMainSelected ? "sidebar-content-selected-settings" : "")
        }
        onClick={() =>
          item.title !== "Settings" ? handleNavigation(item.path) : ""
        }
      >
        <div
          className={
            "sidebar-content " + (isSelected ? "sidebar-content-selected" : "")
          }
          onClick={() =>
            item.subtitle?.length !== 0 ? handleToggleMenu(item) : ""
          }
        >
          <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
            <img alt="" src={require(`../../assets/${item.icon}.svg`)} />
            {isHovered && <div className="sidebar-title">{item.title}</div>}
          </div>
          {item.subtitle?.length !== 0 && (
            <img src={dropdownArrow} alt="" className="" />
          )}
        </div>
        {item.subtitle?.length !== 0 &&
          item.expand &&
          item.subtitle.map((ele, index) => (
            <div key={index}>{displaySidebarMenu(ele)}</div>
          ))}
      </div>
    );
  };

  return (
    <>
      {location.pathname !== "/" && (
        <div
          className={
            "sidebar-container " +
            (isHovered ? "sidebar-container-hovered" : "")
          }
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="sidebar-header">
            {!isHovered ? (
              <img src={wayamLogo} alt="" />
            ) : (
              <img
                src={wayamLogoText}
                alt=""
                onClick={() => handleNavigation("/dashboard")}
              />
            )}
          </div>
          <div className="sidebar-list-content">
            {sidebarList.map((item) => displaySidebarMenu(item))}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
