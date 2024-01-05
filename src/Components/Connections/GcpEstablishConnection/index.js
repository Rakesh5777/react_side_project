import React, { useState } from "react";
import "./gcpEstablishConnection.scss";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";
import CustomButton from "../../../Common/CustomButton";

const GcpEstablishConnection = (props) => {
  const { setActiveStep, handleBackButton } = props;
  const [errorMsg, setErrorMsg] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleProjectId = (e) => {
    setProjectId(e.target.value);
  };

  const handleCreateConnectionButton = () => {
    if (!projectId?.trim()) {
      setErrorMsg("Project ID is required");
    } else {
      setErrorMsg("");
      setActiveStep(4);
    }
  };

  return (
    <div className="connections-gcp-cloud-provider-popup">
      <div className="connections-gcp-cloud-provider-header">
        Establish the connection
      </div>
      <div className="connections-gcp-cloud-provider-title">
        Customer download script
      </div>
      <div className="connections-gcp-cloud-provider-subtitle">
        {"Download and create service accounts & provide the Project ID below"}
      </div>
      <div className="connections-gcp-cloud-provider-link">Download Script</div>
      <div className="connections-gcp-cloud-provider-title">
        Customer follow instructions
      </div>
      <div className="connections-gcp-cloud-provider-subtitle">
        {
          "Please follow the screen shots and create service account & provide the Project ID below"
        }
      </div>
      <div className="connections-gcp-cloud-provider-link">
        View screenshots
      </div>
      <div className="connections-gcp-cloud-provider-form-input">
        <FormInputWithTitle
          title="Project ID"
          type="string"
          placeholder="Add Project ID Here"
          value={projectId}
          mandatory={true}
          errorMsg={errorMsg}
          handleOnChangeInput={handleProjectId}
        />
      </div>
      <div className="connections-gcp-cloud-provider-footer">
        <div className="connections-gcp-cloud-provider-footer-back-btn">
          <CustomButton
            label="Back"
            handleCustomButton={() => handleBackButton(1)}
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
  );
};

export default GcpEstablishConnection;
