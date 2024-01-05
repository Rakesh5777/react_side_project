import React from "react";
import "./integration.scss";
import MainHeader from "../../Common/MainHeader";

import okta from "../../assets/okta.svg";
import slack from "../../assets/slack.svg";
import jira from "../../assets/jira.svg";
import oracle from "../../assets/oracle.svg";
import workday from "../../assets/workday.svg";
import sap from "../../assets/sap.svg";

const Integration = () => {
  const displayIntegrationBlocks = (image, title) => {
    return (
      <div>
        <div className="integration-blocks-container">
          <img className="integration-blocks" alt="" src={image} />
        </div>
        <div className="sso-integration-blocks-title">{title}</div>
      </div>
    );
  };

  return (
    <div className="integration-container">
      <MainHeader header="Integration" />

      <div className="integration-main-content">
        <div className="integration-content">
          <div className="image-container">
            {displayIntegrationBlocks(okta, "SSO")}
            {displayIntegrationBlocks(slack, "Messaging")}
            {displayIntegrationBlocks(jira, "Project Management")}
          </div>
          <div className="image-container">
            {displayIntegrationBlocks(oracle, "Finance")}
            {displayIntegrationBlocks(workday, "Finance")}
            {displayIntegrationBlocks(sap, "Finance")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
