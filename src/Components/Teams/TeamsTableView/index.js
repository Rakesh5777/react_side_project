import React, { useState } from "react";
import "./teamsTableView.scss";
import moreOptions from "../../../assets/moreOptions.svg";
import CustomButton from "../../../Common/CustomButton";

const TeamsTableView = (props) => {
  const { handleTeamDetailsPopup } = props;

  const [teamsTableData, setTeamsTableData] = useState([
    {
      slNo: 1,
      teamName: "David Copperfield",
      description: "david96copperfield@email.com",
      createdOn: "02/17/2023",
      updatedOn: "09/17/2023",
      updatedBy: "Admin",
    },
    {
      slNo: 2,
      teamName: "David Copperfield",
      description: "david96copperfield@email.com",
      createdOn: "02/17/2023",
      updatedOn: "09/17/2023",
      updatedBy: "Admin",
    },
    {
      slNo: 3,
      teamName: "David Copperfield",
      description: "david96copperfield@email.com",
      createdOn: "02/17/2023",
      updatedOn: "09/17/2023",
      updatedBy: "Admin",
    },
  ]);

  const displayTeamsActionButtons = () => {
    return (
      <div className="teams-action-btn-container">
        <div className="teams-action-btn-cont">
          <div className="teams-action-add-role-btn">
            <CustomButton
              label="Add Team"
              handleCustomButton={handleTeamDetailsPopup}
            />
          </div>
        </div>
      </div>
    );
  };

  const displayTeamsContent = () => {
    return (
      <div className="teams-main-table-content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Team Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
              <th scope="col">Updated By</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {teamsTableData.map((item) => (
              <tr key={item.slNo}>
                <td>{item.slNo}</td>
                <td style={{ color: "#1B6EBB" }}>{item.teamName}</td>
                <td>{item.description}</td>
                <td>{item.createdOn}</td>
                <td>{item.updatedOn}</td>
                <td>{item.updatedBy}</td>
                <td>
                  <img src={moreOptions} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="teams-main-content">
      {displayTeamsActionButtons()}
      {displayTeamsContent()}
    </div>
  );
};

export default TeamsTableView;
