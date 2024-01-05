import React from "react";
import "./validationMsgPopup.scss";
import Dialog from "@mui/material/Dialog";
import Loader from "react-js-loader";

const ValidationMsgPopup = (props) => {
  const { openPopup, validationMsg, handleClosePopup } = props;
  return (
    <div>
      <Dialog onClose={handleClosePopup} open={openPopup}>
        <div className="validation-msg-popup-container">
          <div className="validation-msg-popup-text">Validating ARN</div>
          {validationMsg ? (
            <div
              className="validation-msg-popup-validation-text"
              style={{
                color:
                  validationMsg === "ARN is Validated Successfully"
                    ? "#105F0E"
                    : "#9B2C2C",
              }}
            >
              {validationMsg}
            </div>
          ) : (
            <Loader
              type="spinner-default"
              bgColor="#1B6EBB"
              color="#1B6EBB"
              size={100}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ValidationMsgPopup;
