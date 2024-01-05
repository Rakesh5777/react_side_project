import React, { useEffect, useState } from "react";
import "./alertSnackbar.scss";
import { ALERT_TYPES } from "./constants";

const AlertSnackbar = (props) => {
  const { openAlertSnackbar, type, alertMsg, handleCloseAlertSnackbar } = props;

  const [alertType, setAlertType] = useState(ALERT_TYPES["success"]);

  useEffect(() => {
    if (openAlertSnackbar) {
      if (type && ALERT_TYPES.hasOwnProperty(type)) {
        setAlertType(ALERT_TYPES[type]);
      } else {
        setAlertType(ALERT_TYPES["success"]);
      }
      setTimeout(() => {
        handleCloseAlertSnackbar();
      }, 3000);
    }
  }, [openAlertSnackbar, type]);

  return (
    <div className="alert-snackbar-cont">
      <div
        className="alert-snackbar-container"
        style={{
          backgroundColor: alertType?.backgroundColor,
          borderColor: alertType?.borderColor,
        }}
      >
        <div
          style={{
            flex: "1",
            marginRight: "16px",
            display: "flex",
            alignItem: "center",
          }}
        >
          <img
            alt=""
            src={require(`../../assets/${alertType?.icon}.svg`)}
            className="alert-snackbar-icon"
          />
          <div
            className="alert-snackbar-text"
            style={{ color: alertType?.color }}
          >
            {alertMsg}
          </div>
        </div>
        <img
          alt=""
          src={require(`../../assets/${alertType?.closeIcon}.svg`)}
          onClick={handleCloseAlertSnackbar}
          className="alert-snackbar-close-icon"
        />
      </div>
    </div>
  );
};

export default AlertSnackbar;
