import React, { useState, useEffect } from "react";
import "./connections.scss";
import MainHeader from "../../Common/MainHeader";
import MainContent from "../../Common/MainContent";
import connectionsImg from "../../assets/connectionsImg.svg";
import awsIcon from "../../assets/aws.png";
import gcpIcon from "../../assets/gcp.png";
import AwsActionOwnwer from "./AwsActionOwner";
import ConnectionsTable from "./ConnectionsTable";
import GcpEstablishConnection from "./GcpEstablishConnection";
import AwsEstablishConnection from "./AwsEstablishConnection";
import axios from "axios";


const Connections = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCloudProvider, setSelectedCloudProvider] = useState("");
  const [connectionName, setConnectionName] = useState("");
  const [createConnectionClick, setCreateConnectionClick] = useState(false);

  const [data,setData] = useState(null)
  useEffect(() => {
    getConnections();
  }, []);


  const getConnections = () => {
    fetch("http://127.0.0.1:8000/connections", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test:"dummy" })
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
      }else{
        setData(data?.connections_detail)
        setActiveStep(4)
      }
  })
      .catch((error) => {
        // handle error
        console.log(error);
        setActiveStep(0);
      });
    
    
  };

  const handleCustomButton = () => {
    setActiveStep(1);
  };

  const handleAwsSteps = () => {
    setActiveStep(2);
    setSelectedCloudProvider("aws");
  };

  const handleGcpSteps = () => {
    setActiveStep(2);
    setSelectedCloudProvider("gcp");
  };

  const handleBackButton = (step) => {
    setActiveStep(step);
  };

  const getSubtitle = () => {
    return (
      <>
        <div>You don't have any Connections yet.</div>
        <div>Go ahead get started with one.</div>
      </>
    );
  };

  const displayAddConnections = () => {
    return (
      <MainContent
        titleImg={connectionsImg}
        title="Connections List"
        subtitle={getSubtitle()}
        buttonLabel="Add Connections"
        handleCustomButton={handleCustomButton}
      />
    );
  };

  const displayCloudProviderOptions = () => {
    return (
      <div className="connections-cloud-provider-poup">
        <div className="connections-cloud-provider-header">
          Select Cloud Provider
        </div>
        <div className="connections-cloud-provider-options">
          <div
            className="connections-cloud-provider-options-img-cont aws-img-cont"
            onClick={handleAwsSteps}
          >
            <img
              alt=""
              src={awsIcon}
              className="connections-cloud-provider-options-aws-img"
            />
          </div>
          <div
            className="connections-cloud-provider-options-img-cont gcp-img-cont"
            onClick={handleGcpSteps}
          >
            <img
              alt=""
              src={gcpIcon}
              className="connections-cloud-provider-options-gcp-img"
            />
            <div className="connections-cloud-provider-options-img-title">
              GCP
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    
    <div className="connections-container">
      <MainHeader
        header={
          "Connections" +
          (activeStep > 0 && activeStep <= 3 ? " > New Connection" : "")
        }
      />
      <div className="connections-body-content">
        {activeStep === 0 && displayAddConnections()}
        {activeStep > 0 && activeStep <= 3 && (
          <div
            className="d-flex ai-center justify-content-center"
            style={{ marginTop: "20px" }}
          >
            <div>
              {activeStep > 0 && activeStep <= 3 && (
                <div className="connections-steps-text">
                  Step {activeStep} of 3
                </div>
              )}
              {activeStep === 1 && displayCloudProviderOptions()}
              {activeStep === 2 && selectedCloudProvider === "aws" && (
                <AwsActionOwnwer
                  connectionName={connectionName}
                  setActiveStep={setActiveStep}
                  setSelectedCloudProvider={setSelectedCloudProvider}
                  setConnectionName={setConnectionName}
                  handleBackButton={handleBackButton}
                />
              )}
              {activeStep === 3 && selectedCloudProvider === "aws" && (
                <AwsEstablishConnection
                  connectionName={connectionName}
                  setActiveStep={setActiveStep}
                  handleBackButton={handleBackButton}
                  setCreateConnectionClick={setCreateConnectionClick}
                  setData={setData}
                  data={data}
                />
              )}
              {activeStep === 2 && selectedCloudProvider === "gcp" && (
                <GcpEstablishConnection
                  setActiveStep={setActiveStep}
                  handleBackButton={handleBackButton}
                />
              )}
            </div>
          </div>
        )}
        {activeStep === 4 && <ConnectionsTable setActiveStep={setActiveStep} CONNECTIONS_DATA={data} createConnectionClick={createConnectionClick}/>}
      </div>
    </div>
  );
};

export default Connections;
