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
    usersTableData,
    selectedRows,
    setSelectedRows,
    handleIsEditUserMode,
    handleUpdateTable
  } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    if (!selectedRows.length) return; 
    setMenuOpen(!menuOpen);
  };

  const handleRemove = () => {
    fetch('http://127.0.0.1:8000/remove_users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users: usersTableData.filter((item) => selectedRows.includes(item.id)) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete users');
        }
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          handleUpdateTable();
          setMenuOpen(false);
        } else {
          throw new Error('Failed to delete users');
        }
      })
  }

  const handleSelectRow = (id) => {
    setMenuOpen(false);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const displayUsersActionButtons = () => {
    return (
      <div className="users-action-btn-container">
        <div className="users-action-btn-cont">
          <div className="users-action-container">
            <div onClick={handleToggleMenu} className={`users-action-btn pointer ${!selectedRows.length ? 'disabled-btn' : ''}`}>Actions</div>
            {menuOpen && (
              <div className="menu pointer">
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
            {usersTableData.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td style={{ color: "#1B6EBB" }}>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{!!roleIdMap[item.roleId] ? roleIdMap[item.roleId] : '-'}</td>
                <td>{!!teamIdMap[item.teamId] ? teamIdMap[item.teamId] : '-'}</td>
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
