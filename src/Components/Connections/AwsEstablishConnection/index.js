import React, { useState } from "react";
import wayamShield from "../../../assets/wayamShield.svg";
import infoIcon from "../../../assets/infoIcon.svg";
import CustomButton from "../../../Common/CustomButton";
import Drawer from "@mui/material/Drawer";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";
import axios from "axios";
import ValidationMsgPopup from "./ValidationMsgPopup";

const AwsEstablishConnection = (props) => {
  const { connectionName, setActiveStep, handleBackButton } = props;
  const [wayamConnectionSelected, setWayamConnectionSelected] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [roleArn, setRoleArc] = useState("");
  const [openValidationArnPopup, setOpenValidationArnPopup] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const handleToggleConnectionOptions = () => {
    setWayamConnectionSelected(!wayamConnectionSelected);
  };

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleRoleArn = (e) => {
    setRoleArc(e.target.value);
  };

  const handleCreateConnectionButton = () => {
    console.log("revise 123")
    if (!wayamConnectionSelected && !roleArn?.trim()) {
      setErrorMsg("ARN is required");
    } else {
      console.log("revise error", wayamConnectionSelected, roleArn)
      setErrorMsg("");

      const regex = /arn:aws:*/;
      var arn = roleArn?.trim();
      console.log("roleArn", arn)
      handleArnValidation();
      if (regex.test(arn)) {
        handleArnValidation();
        setOpenValidationArnPopup(true);
      } else {
        setErrorMsg("Enter a valid ARN");
      }
    }
  };

  const handleArnValidation = () => {
    axios
      .get("/arn_validation")
      .then((res) => {
        if (res?.data?.arn_valid) {
          setTimeout(() => {
            setValidationMsg("ARN is Validated Successfully");
            setTimeout(() => {
              handleClosePopup();
              setActiveStep(4);
            }, 2000);
          }, 4000);
        } else {
          setTimeout(() => {
            setValidationMsg("ARN is not valid. Please try again.");
            setTimeout(() => {
              handleClosePopup();
            }, 2000);
          }, 4000);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleClosePopup = () => {
    setOpenValidationArnPopup(false);
    setValidationMsg("");
  };

  return (
    <>
      <div className="connections-aws-cloud-provider-popup">
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "16px", marginBottom: "24px" }}
        >
          <div>
            Connection Name: <b>{connectionName}</b>
          </div>
        </div>
        <div className="connections-aws-cloud-provider-header">
          Choose method of establishing the connection
        </div>
        <div
          className={
            "connection_resource-aws-cloud-provider-options " +
            (wayamConnectionSelected
              ? "connection_resource-aws-cloud-provider-options-selected"
              : "")
          }
        >
          <input
            type="radio"
            checked={wayamConnectionSelected}
            onChange={handleToggleConnectionOptions}
            className="connections-aws-cloud-provider-radio-btn"
          />
          <div style={{ width: "fit-content" }}>
            <div className="connections-aws-cloud-provider-option-header d-flex align-items-center">
              <img alt="" src={wayamShield} style={{ marginRight: "8px" }} />{" "}
              Wayam (Preferred){" "}
              <img alt="" src={infoIcon} style={{ marginLeft: "4px" }} />
            </div>
            <div className="connections-aws-cloud-provider-option-subheader">
              Allowing Wayam to create a StackSet and Automatically get the
              Assume Role ARN. The complete required permissions are described{" "}
              <span className="connection-link" onClick={handleToggleDrawer}>
                here.
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            "connection_resource-aws-cloud-provider-options " +
            (!wayamConnectionSelected
              ? "connection_resource-aws-cloud-provider-options-selected"
              : "")
          }
        >
          <input
            type="radio"
            checked={!wayamConnectionSelected}
            onChange={handleToggleConnectionOptions}
            className="connections-aws-cloud-provider-radio-btn"
          />
          <div style={{ width: "fit-content" }}>
            <div className="connections-aws-cloud-provider-option-header">
              Customer
            </div>
            <div className="connections-aws-cloud-provider-option-subheader">
              Customer will download the Cloud Formation from here and creates
              the Stack set to provide the Assume Role ARN below. The complete
              required permissions are described{" "}
              <span className="connection-link" onClick={handleToggleDrawer}>
                here.
              </span>
            </div>
          </div>
        </div>
        {!wayamConnectionSelected && (
          <div
            className="connections-aws-cloud-provider-form-input"
            style={{ marginTop: "18px" }}
          >
            <FormInputWithTitle
              title="Assume Role ARN"
              type="string"
              placeholder="Add Name"
              value={roleArn}
              mandatory={true}
              errorMsg={errorMsg}
              handleOnChangeInput={handleRoleArn}
            />
          </div>
        )}
        <div className="connections-aws-cloud-provider-footer">
          <div className="connections-aws-cloud-provider-footer-back-btn">
            <CustomButton
              label="Back"
              handleCustomButton={() => handleBackButton(2)}
            />
          </div>
          <div>
            <CustomButton
              label="Create Connection"
              handleCustomButton={handleCreateConnectionButton}
            />
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={openDrawer} onClose={handleToggleDrawer}>
        <div className="connection-drawer-container">
          <div className="connection-drawer-title">Title</div>
          <div className="connection-drawer-content">Content</div>
        </div>
      </Drawer>
      {openValidationArnPopup && (
        <ValidationMsgPopup
          openPopup={openValidationArnPopup}
          validationMsg={validationMsg}
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
};

export default AwsEstablishConnection;
