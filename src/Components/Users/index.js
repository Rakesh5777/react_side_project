import React, { useEffect, useState } from "react";
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
    roleId: "",
    teamId: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [usersTableData, setUsersTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isEditUserMode, setEditUserMode] = useState(false);

  useEffect(() => {
    getTableData();
  }, [])

  const getTableData = () => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersTableData(data?.user_details);
        if (data?.user_details?.length === 0) {
          setActiveStep(0);
        } else {
          setActiveStep(2);
        }
      });
  }

  const handleUpdateTable = () => {
    getTableData();
  }


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
      !userDetails?.email?.trim() ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userDetails.email)
    ) {
      setShowError(true);
    } else {
      isEditUserMode ? postEditUserDetails() : postUserDetails();
    }
  };

  const postEditUserDetails = () => {
    fetch("http://127.0.0.1:8000/update_user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userDetails }),
    })
      .then((response) => response.json())
      .then(() => {
        setShowError(false);
        handleUpdateTable();
        setActiveStep(2);
        setEditUserMode(false);
      })
  }

  const postUserDetails = () => {
    const currentDate = new Date().toLocaleDateString("en-GB");
    fetch("http://127.0.0.1:8000/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userDetails, createdOn: currentDate, lastLogin: currentDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowError(false);
        setUsersTableData((prev) => [...prev, data?.user_detail]);
        setActiveStep(2);
      })
  }

  const handleOnChangeInput = (name, e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };

  const handleChangeDropdownInput = (name, item) => {
    setUserDetails({ ...userDetails, [name]: item.value });
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
        isEditUserMode={isEditUserMode}
      />
    );
  };

  const handleIsEditUserMode = (rowDetails) => {
    setUserDetails(rowDetails);
    setActiveStep(1);
    setEditUserMode(true);
  }

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
        <UsersTable
          usersTableData={usersTableData}
          handleUserDetailsPopup={handleUserDetailsPopup}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          handleIsEditUserMode={handleIsEditUserMode}
          isEditUserMode={isEditUserMode}
          handleUpdateTable={handleUpdateTable}
        />
      )}
    </div>
  );
};

export default Users;
