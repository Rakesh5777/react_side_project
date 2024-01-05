import React from "react";
import "./teamDetailsPopup.scss";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";
import CustomButton from "../../../Common/CustomButton";
import trash from "../../../assets/trash.svg";

const TeamDetailsPopup = (props) => {
  const {
    teamDetails,
    userNames,
    showError,
    handleOnChangeInput,
    handleAddTeamDetails,
    handleDeleteUser,
    handleAddMember,
  } = props;

  const displayTeamsDetailsPopup = () => {
    return (
      <div className="teams-details-popup">
        <div className="teams-details-popup-header">Create Team</div>
        <div className="teams-details-popup-subheader">
          lorem ipsum dummy text to represent what you want to convey
        </div>
        <div className="teams-details-popup-form-inputs">
          <FormInputWithTitle
            title="Team Name"
            placeholder="Add a name"
            value={teamDetails.teamName}
            mandatory={true}
            errorMsg={
              showError && !teamDetails.teamName?.trim()
                ? "Team Name is required"
                : ""
            }
            titleInfoHoverMsg="Team Name"
            titleInfoHoverMsgPosition="top"
            handleOnChangeInput={(e) => handleOnChangeInput("teamName", e)}
          />
          <FormInputWithTitle
            title="Team Description"
            placeholder="Add description"
            value={teamDetails.description}
            mandatory={true}
            errorMsg={
              showError && !teamDetails.description?.trim()
                ? "Team Description is required"
                : ""
            }
            titleInfoHoverMsg="Team Description"
            titleInfoHoverMsgPosition="top"
            handleOnChangeInput={(e) => handleOnChangeInput("description", e)}
          />
        </div>
        <FormInputWithTitle
          title="Project Name"
          placeholder="Add project name"
          value={teamDetails.projectName}
          mandatory={true}
          errorMsg={
            showError && !teamDetails.projectName?.trim()
              ? "Project Name is required"
              : ""
          }
          titleInfoHoverMsg="Project Name"
          titleInfoHoverMsgPosition="top"
          handleOnChangeInput={(e) => handleOnChangeInput("projectName", e)}
        />
        <div
          className="team-details-add-member"
          style={{
            alignItems: showError && userNames?.length === 0 ? "center" : "",
          }}
        >
          <FormInputWithTitle
            title="Add Member"
            placeholder="Add user name"
            value={teamDetails.userName}
            mandatory={true}
            errorMsg={
              showError && userNames?.length === 0 ? "Member is required" : ""
            }
            titleInfoHoverMsg="User Name"
            titleInfoHoverMsgPosition="top"
            handleOnChangeInput={(e) => handleOnChangeInput("userName", e)}
          />
          <div
            className="team-details-add-member-btn"
            onClick={handleAddMember}
            style={{
              marginTop: showError && userNames?.length === 0 ? "5px" : "",
            }}
          >
            + Add Member
          </div>
        </div>
        <div className="team-details-add-member-text">Added Member Names</div>
        {userNames.map((item, ind) => (
          <div key={ind} className="team-details-add-member-names">
            <div>{item}</div>
            <img alt="" src={trash} onClick={() => handleDeleteUser(ind)} />
          </div>
        ))}
        <div className="teams-details-popup-footer">
          <CustomButton
            label="Add Team"
            handleCustomButton={handleAddTeamDetails}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="teams-details-popup-container">
      {displayTeamsDetailsPopup()}
    </div>
  );
};

export default TeamDetailsPopup;
