import React, { useState } from "react";
import "./teams.scss";
import MainHeader from "../../Common/MainHeader";
import teamsImg from "../../assets/teamsImg.svg";
import MainContent from "../../Common/MainContent";
import TeamDetailsPopup from "./TeamDetailsPopup";
import TeamsTableView from "./TeamsTableView";

const Teams = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [teamDetails, setTeamDetails] = useState({
    teamName: "",
    description: "",
    projectName: "",
    userName: "",
  });
  const [userNames, setUserNames] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleTeamDetailsPopup = () => {
    setTeamDetails({
      teamName: "",
      description: "",
      projectName: "",
      userName: "",
    });
    setUserNames([]);
    setActiveStep(1);
  };

  const handleAddTeamDetails = () => {
    if (
      !teamDetails?.teamName?.trim() ||
      !teamDetails?.description?.trim() ||
      !teamDetails?.projectName?.trim() ||
      userNames?.length === 0
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      setActiveStep(2);
    }
  };

  const handleOnChangeInput = (name, e) => {
    setTeamDetails({ ...teamDetails, [name]: e.target.value });
  };

  const handleDeleteUser = (ind) => {
    userNames.splice(ind, 1);
    setUserNames([...userNames]);
  };

  const handleAddMember = () => {
    userNames.push(teamDetails?.userName);
    setUserNames([...userNames]);
    setTeamDetails({ ...teamDetails, userName: "" });
  };

  const getSubtitle = () => {
    return (
      <>
        <div>You don't have any Teams yet.</div>
        <div>Go ahead get started with one.</div>
      </>
    );
  };

  const displayAddTeams = () => {
    return (
      <MainContent
        titleImg={teamsImg}
        title="Teams"
        subtitle={getSubtitle()}
        buttonLabel="Add Team"
        handleCustomButton={handleTeamDetailsPopup}
      />
    );
  };

  const displayAddTeamDetails = () => {
    return (
      <TeamDetailsPopup
        teamDetails={teamDetails}
        userNames={userNames}
        showError={showError}
        handleOnChangeInput={handleOnChangeInput}
        handleAddTeamDetails={handleAddTeamDetails}
        handleDeleteUser={handleDeleteUser}
        handleAddMember={handleAddMember}
      />
    );
  };

  return (
    <div className="teams-container">
      <MainHeader
        header={
          "Teams" + (activeStep > 0 && activeStep <= 1 ? " > Add Team" : "")
        }
      />
      {activeStep >= 0 && activeStep < 2 && (
        <div className="teams-body-content">
          {activeStep === 0 && displayAddTeams()}
          {activeStep === 1 && displayAddTeamDetails()}
        </div>
      )}
      {activeStep === 2 && (
        <TeamsTableView handleTeamDetailsPopup={handleTeamDetailsPopup} />
      )}
    </div>
  );
};

export default Teams;
