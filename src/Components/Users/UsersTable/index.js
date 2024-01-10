import React, { useState } from "react";
import "./usersTable.scss";
import editIcon from "../../../assets/estimations.svg";
import CustomButton from "../../../Common/CustomButton";
export const teamIdMap = {
  1: "Techie Phthons",
  2: "Go Googlers"
}

export const roleIdMap = {
  1: "Admin",
  2: "Tester"
}

const UsersTable = (props) => {
  const {
    handleUserDetailsPopup,
    handleSetUsersTableData,
    usersTableData,
    selectedRows,
    setSelectedRows,
    handleIsEditUserMode
  } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRemove = () => {
    const filteredData = usersTableData.filter((item) => !selectedRows.includes(item.slNo));
    fetch('http://127.0.0.1:8000/remove_users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users: usersTableData.filter((item) => selectedRows.includes(item.slNo)) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete users');
        }
        return response.json();
      })
      .then(() => {
        handleSetUsersTableData(() => [...filteredData]);
        setMenuOpen(false);
      })
  }

  const handleSelectRow = (slNo) => {
    if (selectedRows.includes(slNo)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== slNo));
    } else {
      setSelectedRows([...selectedRows, slNo]);
    }
  };

  const displayUsersActionButtons = () => {
    return (
      <div className="users-action-btn-container">
        <div className="users-action-btn-cont">
          <div className="users-action-container">
            <div onClick={handleToggleMenu} className="users-action-btn">Actions</div>
            {menuOpen && (
              <div className="menu">
                <div className="menu-item" onClick={handleRemove}>Remove</div>
              </div>
            )}
          </div>
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
              <th scope="col"></th>
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
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.slNo)}
                    onChange={() => handleSelectRow(item.slNo)}
                  />
                </td>
                <td>{item.slNo}</td>
                <td style={{ color: "#1B6EBB" }}>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{roleIdMap[item.roleId]}</td>
                <td>{teamIdMap[item.teamId]}</td>
                <td>{item.createdOn}</td>
                <td>{item.lastLogin}</td>
                <td>
                  <img src={editIcon} alt="edit mode" onClick={() => { handleIsEditUserMode(item) }} />
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
