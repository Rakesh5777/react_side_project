import React, { useState } from "react";
import "./users.scss";
import MainHeader from "../../Common/MainHeader";
import usersImg from "../../assets/usersImg.svg";
import MainContent from "../../Common/MainContent";
import UserDetailsPopup from "./UserDetailsPopup";
import UsersTable from "./UsersTable";

const Users = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    team: "",
  });
  const [showError, setShowError] = useState(false);

  const handleUserDetailsPopup = () => {
    setUserDetails({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      team: "",
    });
    setActiveStep(1);
  };

  const handleAddUserDetails = () => {
    if (
      !userDetails?.firstName?.trim() ||
      !userDetails?.lastName?.trim() ||
      !userDetails?.email?.trim()
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      setActiveStep(2);
    }
  };

  const handleOnChangeInput = (name, e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };

  const handleChangeDropdownInput = (name, item) => {
    setUserDetails({ ...userDetails, [name]: item.label });
  };

  const getSubtitle = () => {
    return (
      <>
        <div>You don't have any Users yet.</div>
        <div>Go ahead get started with one.</div>
      </>
    );
  };

  const displayAddUsers = () => {
    return (
      <MainContent
        titleImg={usersImg}
        title="Users List"
        subtitle={getSubtitle()}
        buttonLabel="Add User"
        handleCustomButton={handleUserDetailsPopup}
      />
    );
  };

  const displayAddUserDetails = () => {
    return (
      <UserDetailsPopup
        userDetails={userDetails}
        showError={showError}
        handleOnChangeInput={handleOnChangeInput}
        handleAddUserDetails={handleAddUserDetails}
        handleChangeDropdownInput={handleChangeDropdownInput}
      />
    );
  };

  return (
    <div className="users-container">
      <MainHeader
        header={
          "Users" + (activeStep > 0 && activeStep <= 1 ? " > Add User" : "")
        }
      />
      {activeStep >= 0 && activeStep < 2 && (
        <div className="users-body-content">
          {activeStep === 0 && displayAddUsers()}
          {activeStep === 1 && displayAddUserDetails()}
        </div>
      )}
      {activeStep === 2 && (
        <UsersTable handleUserDetailsPopup={handleUserDetailsPopup} />
      )}
    </div>
  );
};

export default Users;
