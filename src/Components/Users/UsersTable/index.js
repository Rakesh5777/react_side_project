import React, { useState } from "react";
import "./usersTable.scss";
import moreOptions from "../../../assets/moreOptions.svg";
import CustomButton from "../../../Common/CustomButton";

const UsersTable = (props) => {
  const { handleUserDetailsPopup } = props;

  const [usersTableData, setUsersTableData] = useState([
    {
      slNo: 1,
      name: "David Copperfield",
      email: "david96copperfield@email.com",
      role: "Admin",
      team: "Techie Pythons",
      createdOn: "02/17/2023",
      lastLogin: "09/17/2023",
    },
    {
      slNo: 2,
      name: "David Copperfield",
      email: "david96copperfield@email.com",
      role: "User",
      team: "Techie Pythons",
      createdOn: "02/17/2023",
      lastLogin: "09/17/2023",
    },
    {
      slNo: 3,
      name: "David Copperfield",
      email: "david96copperfield@email.com",
      role: "Guest",
      team: "Techie Pythons",
      createdOn: "02/17/2023",
      lastLogin: "09/17/2023",
    },
  ]);

  const displayUsersActionButtons = () => {
    return (
      <div className="users-action-btn-container">
        <div className="users-action-btn-cont">
          <div className="users-action-btn">Actions</div>
          <div className="users-action-add-role-btn">
            <CustomButton
              label="Add User"
              handleCustomButton={handleUserDetailsPopup}
            />
          </div>
        </div>
      </div>
    );
  };

  const displayUsersContent = () => {
    return (
      <div className="users-main-table-content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <span>
                  <input type="checkbox" value="checkedAll" />
                </span>
              </th>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Team</th>
              <th scope="col">Created On</th>
              <th scope="col">Last Login</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {usersTableData.map((item) => (
              <tr key={item.slNo}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.slNo}</td>
                <td style={{ color: "#1B6EBB" }}>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.team}</td>
                <td>{item.createdOn}</td>
                <td>{item.lastLogin}</td>
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
    <div className="users-main-content">
      {displayUsersActionButtons()}
      {displayUsersContent()}
    </div>
  );
};

export default UsersTable;
