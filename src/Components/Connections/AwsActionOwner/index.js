import React, { useState } from "react";
import wayamShield from "../../../assets/wayamShield.svg";
import infoIcon from "../../../assets/infoIcon.svg";
import CustomButton from "../../../Common/CustomButton";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";

const AwsActionOwnwer = (props) => {
  const {
    connectionName,
    setActiveStep,
    setSelectedCloudProvider,
    setConnectionName,
    handleBackButton,
  } = props;

  const [wayamSelected, setWayamSelected] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConnectionName = (e) => {
    setConnectionName(e.target.value);
  };

  const handleToggleOptions = () => {
    setWayamSelected(!wayamSelected);
  };

  const handleNextButton = () => {
    if (!connectionName?.trim()) {
      setErrorMsg("Connection Name is required");
    } else {
      setErrorMsg("");
      setActiveStep(3);
      setSelectedCloudProvider("aws");
    }
  };

  return (
    <div className="connections-aws-cloud-provider-popup">
      <div className="connections-aws-cloud-provider-form-input">
        <FormInputWithTitle
          title="Provide a Connection Name"
          type="string"
          placeholder="Add Name"
          value={connectionName}
          mandatory={true}
          errorMsg={errorMsg}
          handleOnChangeInput={handleConnectionName}
        />
      </div>
      <div className="connections-aws-cloud-provider-header">
        Choose Cost Control Action Owner
      </div>
      <div
        className={
          "connection_resource-aws-cloud-provider-options " +
          (wayamSelected
            ? "connection_resource-aws-cloud-provider-options-selected"
            : "")
        }
      >
        <input
          type="radio"
          checked={wayamSelected}
          onChange={handleToggleOptions}
          className="connections-aws-cloud-provider-radio-btn"
        />
        <div>
          <div className="connections-aws-cloud-provider-option-header d-flex align-items-center">
            <img alt="" src={wayamShield} style={{ marginRight: "8px" }} />{" "}
            Wayam (Preferred){" "}
            <img alt="" src={infoIcon} style={{ marginLeft: "4px" }} />
          </div>
          <div className="connections-aws-cloud-provider-option-subheader">
            Wayam will take the ownership of acting on resources that are run
            and causing cost creep.
          </div>
        </div>
      </div>
      <div
        className={
          "connection_resource-aws-cloud-provider-options " +
          (!wayamSelected
            ? "connection_resource-aws-cloud-provider-options-selected"
            : "")
        }
      >
        <input
          type="radio"
          checked={!wayamSelected}
          onChange={handleToggleOptions}
          className="connections-aws-cloud-provider-radio-btn"
        />
        <div>
          <div className="connections-aws-cloud-provider-option-header">
            Customer
          </div>
          <div className="connections-aws-cloud-provider-option-subheader">
            Customer will take the ownership of acting on resources that are run
            and causing cost creep.
          </div>
        </div>
      </div>
      <div className="connections-aws-cloud-provider-footer">
        <div className="connections-aws-cloud-provider-footer-back-btn">
          <CustomButton
            label="Back"
            handleCustomButton={() => handleBackButton(1)}
          />
        </div>
        <div>
          <CustomButton label="Next" handleCustomButton={handleNextButton} />
        </div>
      </div>
    </div>
  );
};

export default AwsActionOwnwer;
