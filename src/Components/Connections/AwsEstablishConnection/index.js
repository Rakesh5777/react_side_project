import React, { useState } from "react";
import wayamShield from "../../../assets/wayamShield.svg";
import infoIcon from "../../../assets/infoIcon.svg";
import CustomButton from "../../../Common/CustomButton";
import Drawer from "@mui/material/Drawer";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";
import axios from "axios";
import ValidationMsgPopup from "./ValidationMsgPopup";
import closeIcon from "../../../assets/closeIcon.svg";
import "./awsEstablishConnection.scss";

const AwsEstablishConnection = (props) => {
  const { connectionName, setActiveStep, handleBackButton, data, setData, setCreateConnectionClick } = props;
  const [wayamConnectionSelected, setWayamConnectionSelected] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [roleArn, setRoleArc] = useState("");
  const [openValidationArnPopup, setOpenValidationArnPopup] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [showButton, setShowButton] = useState(false);

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
    setCreateConnectionClick(true)
    if (!wayamConnectionSelected && !roleArn?.trim()) {
      setErrorMsg("ARN is required");
    } else {
      setErrorMsg("");

      const regex = /arn:aws:*/;
      var arn = roleArn?.trim();

      // handleArnValidation();
      if (regex.test(arn)) {
        handleArnValidation();
        setOpenValidationArnPopup(true);
      } else {
        setErrorMsg("Enter a valid ARN");
      }
    }
  };

  const connectionTeamplate = [  {
    id: 1,
    name: connectionName,
    project_id: "KLP-NHJ-34512",
    cloud_provider: "AWS",
    connection_type: "Customer",
    created_date: "10/01/2023",
    created_by: "Jannel Rubben",
    last_checked: "10/01/2023",
    last_success: "02/17/2023 - 08:15 CST",
    account_type: "Payer",
    connection_status: "success",
    child_connections: [],
    expand: false,
  }]

  const handleArnValidation = () => {
    axios
      .post("http://127.0.0.1:8000/arn_validation",{arn:roleArn?.trim()})
      .then((res) => {
        if (res?.data?.arn_valid) {
          setTimeout(() => {
            setValidationMsg("ARN is Validated Successfully");
            setTimeout(() => {
              handleClosePopup();
              setActiveStep(4);
              createConnectionEntry();
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
        //For failure Uncomment the commented and comment the Uncommented
        // handle error
        console.log(error);
        setTimeout(() => {
          setValidationMsg("ARN is Validated Failed");
          setTimeout(() => {
            handleClosePopup();
            setShowButton(true);
            setActiveStep(3);
            createConnectionEntry();
            setData([...data, ...connectionTeamplate]);
          }, 2000);
        }, 4000);
        // setTimeout(() => {
        //   setValidationMsg("ARN is Validated Successfully");
        //   setTimeout(() => {
        //     handleClosePopup();
        //     setActiveStep(4);
        //     createConnectionEntry();
        //     setData([...data, ...connectionTeamplate]);
        //   }, 2000);
        // }, 4000);
      });
  };

  const createConnectionEntry = () => {
    fetch("http://127.0.0.1:8000/connections", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test:connectionName })
    }).then(response => {
      if (!response.ok) {
          throw new Error(JSON.stringify(response));
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      if(data?.connections_detail.length===0){
        setActiveStep(0)
        console.log("No connections")
      }
  })
      .catch((error) => {
        // handle error
        console.log(error);
        // setActiveStep(0);
      });
  };

  const displayFailureAddConnectionMsg = () => {

    const closeFailureButton = () => {
      setShowButton(false);
    };
  
    return (
<>
      {showButton && (
        <div className="FailureButton">
          <button>
            Failed in creating a connection with AWS Cloud Provider.
            <span className="close-icon" onClick={closeFailureButton}>
              <img src={closeIcon} alt="Close" />
            </span>
          </button>
        </div>
      )}
    </>
    );
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
      {displayFailureAddConnectionMsg()}
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
