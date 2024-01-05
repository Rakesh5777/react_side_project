import React from "react";
import "./userDetailsPopup.scss";
import FormInputWithTitle from "../../../Common/FormInputWithTitle";
import CustomButton from "../../../Common/CustomButton";
import Dropdown from "../../../Common/Dropdown";

const UserDetailsPopup = (props) => {
  const {
    userDetails,
    showError,
    handleOnChangeInput,
    handleAddUserDetails,
    handleChangeDropdownInput,
  } = props;

  const displayUsersDetailsPopup = () => {
    return (
      <div className="users-details-popup">
        <div className="users-details-popup-header">Add User Details</div>
        <div className="users-details-popup-subheader">
          lorem ipsum dummy text to represent what you want to convey
        </div>
        <div className="users-details-popup-form-inputs">
          <FormInputWithTitle
            title="First Name"
            placeholder="Add first name"
            value={userDetails.firstName}
            mandatory={true}
            errorMsg={
              showError && !userDetails.firstName?.trim()
                ? "First Name is required"
                : ""
            }
            titleInfoHoverMsg="First Name"
            titleInfoHoverMsgPosition="top"
            handleOnChangeInput={(e) => handleOnChangeInput("firstName", e)}
          />
          <FormInputWithTitle
            title="Last Name"
            placeholder="Add last name"
            value={userDetails.lastName}
            mandatory={true}
            errorMsg={
              showError && !userDetails.lastName?.trim()
                ? "Last Name is required"
                : ""
            }
            titleInfoHoverMsg="Last Name"
            titleInfoHoverMsgPosition="top"
            handleOnChangeInput={(e) => handleOnChangeInput("lastName", e)}
          />
        </div>
        <FormInputWithTitle
          title="Email Address"
          placeholder="Add email"
          value={userDetails.email}
          mandatory={true}
          errorMsg={
            showError && !userDetails.email?.trim() ? "Email is required" : ""
          }
          titleInfoHoverMsg="Email"
          titleInfoHoverMsgPosition="top"
          handleOnChangeInput={(e) => handleOnChangeInput("email", e)}
        />
        <div className="users-details-popup-form-inputs">
          <Dropdown
            title="Select Role"
            selectedValue={userDetails.role}
            options={[{ label: "1" }, { label: "2" }]}
            titleInfoHoverMsg="Role"
            titleInfoHoverMsgPosition="top"
            handleSelectDropdown={(item) =>
              handleChangeDropdownInput("role", item)
            }
          />
          <Dropdown
            title="Select Team"
            selectedValue={userDetails.team}
            options={[{ label: "1" }, { label: "2" }]}
            titleInfoHoverMsg="Team"
            titleInfoHoverMsgPosition="top"
            handleSelectDropdown={(item) =>
              handleChangeDropdownInput("team", item)
            }
          />
        </div>
        <div className="users-details-popup-footer">
          <CustomButton
            label="Add User"
            handleCustomButton={handleAddUserDetails}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="users-details-popup-container">
      {displayUsersDetailsPopup()}
    </div>
  );
};

export default UserDetailsPopup;
