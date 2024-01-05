import React from "react";
import "./dashboard.scss";
import dashboardDisplay from "../../assets/dashboardDisplay.png";
import MainHeader from "../../Common/MainHeader";

const Dashboard = () => {
  return (

    <div className="dashboard-container">
      <MainHeader header="Dashboard" />
      <div >
      <img className="image" alt="" src={dashboardDisplay}/>
      </div>
    </div>

  );
};

export default Dashboard;
