import React from "react";
import "./roles.scss";
import MainHeader from "../../Common/MainHeader";
import moreOptions from "../../assets/moreOptions.svg";
import { ROLES_DATA } from "./constants";
import CustomButton from "../../Common/CustomButton";

const Roles = () => {
  const displayRolesActionButtons = () => {
    return (
      <div className="roles-action-btn-container">
        <div className="roles-action-btn-cont">
          <div className="roles-action-btn">Actions</div>
          <div className="roles-action-add-role-btn">
            <CustomButton label="Add Role" disabled={true} />
          </div>
        </div>
      </div>
    );
  };

  const displayRolesContent = () => {
    return (
      <div className="roles-main-table-content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <span>
                  <input type="checkbox" value="checkedAll" />
                </span>
              </th>
              <th scope="col">No</th>
              <th scope="col">Role Name</th>
              <th scope="col">Permissions</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated on</th>
              <th scope="col">Updated by</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {ROLES_DATA.map((item) => (
              <tr key={item.slNo}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.slNo}</td>
                <td style={{ color: "#1B6EBB" }}>{item.roleName}</td>
                <td>{item.permissions}</td>
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
    <div className="roles-container">
      <MainHeader header="Roles" />
      <div className="roles-main-content">
        {displayRolesActionButtons()}
        {displayRolesContent()}
      </div>
    </div>
  );
};

export default Roles;
