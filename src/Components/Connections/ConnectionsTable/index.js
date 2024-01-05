import React, { useState } from "react";
import "./connectionsTable.scss";
// import { CONNECTIONS_DATA } from "./constants";
import rightArrowBlue from "../../../assets/rightArrowBlue.svg";
import clipboardCheck from "../../../assets/clipboardCheck.svg";
import clipboardX from "../../../assets/clipboardX.svg";
import moreOptions from "../../../assets/moreOptions.svg";
import CustomButton from "../../../Common/CustomButton";

const ConnectionsTable = (props) => {
  const { setActiveStep, CONNECTIONS_DATA } = props;
  const [connectionsData, setConnectionsData] = useState(CONNECTIONS_DATA);

  const handleExpandConnections = (item) => {
    let ind = connectionsData.findIndex((ele) => ele.id === item.id);
    connectionsData[ind].expand = !connectionsData[ind].expand;
    setConnectionsData([...connectionsData]);
  };

  const handleCustomButton = () => {
    setActiveStep(1);
  };

  const displayAddConnectionBtn = () => {
    return (
      <div className="connections-table-add-connections-btn">
        <CustomButton
          label="Add Connections"
          handleCustomButton={handleCustomButton}
        />
      </div>
    );
  };

  const displayConnectionTable = () => {
    return (
      <div className="connections-table-content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Account/Project ID</th>
              <th scope="col">Cloud Provider</th>
              <th scope="col">Connection Type</th>
              <th scope="col">Created Date</th>
              <th scope="col">Created By</th>
              <th scope="col">Last Checked</th>
              <th scope="col">Last Success</th>
              <th scope="col">Account Type</th>
              <th scope="col">Connection Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {connectionsData.map((item) => (
              <>
                <tr key={item.id}>
                 <td>
                    {item?.child_connections.length>0 && <img
                      alt=""
                      src={rightArrowBlue}
                      onClick={() => handleExpandConnections(item)}
                      className={
                        item.expand
                          ? "connections-table-arrow-expand"
                          : "connections-table-arrow-collapse"
                      }
                    />}
                  </td>
                  <td style={{ color: "#1B6EBB" }}>{item.name}</td>
                  <td>{item.project_id}</td>
                  <td>{item.cloud_provider}</td>
                  <td>{item.connection_type}</td>
                  <td>{item.created_date}</td>
                  <td>{item.created_by}</td>
                  <td>{item.last_checked}</td>
                  <td>{item.last_success}</td>
                  <td>{item.account_type}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      alt=""
                      src={
                        item.connection_status === "success"
                          ? clipboardCheck
                          : clipboardX
                      }
                    />
                  </td>
                  <td>
                    <img src={moreOptions} alt="" />
                  </td>
                </tr>
                {item.child_connections?.length !== 0 &&
                  item.expand &&
                  item.child_connections.map((child_item) => (
                    <tr
                      key={child_item.id}
                      style={{ backgroundColor: "#fafafa" }}
                    >
                      <td></td>
                      <td style={{ color: "#1B6EBB" }}>{child_item.name}</td>
                      <td>{child_item.project_id}</td>
                      <td>{child_item.cloud_provider}</td>
                      <td>{child_item.connection_type}</td>
                      <td>{child_item.created_date}</td>
                      <td>{child_item.created_by}</td>
                      <td>{child_item.last_checked}</td>
                      <td>{child_item.last_success}</td>
                      <td>{child_item.account_type}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          alt=""
                          src={
                            child_item.connection_status === "success"
                              ? clipboardCheck
                              : clipboardX
                          }
                        />
                      </td>
                      <td>
                        <img src={moreOptions} alt="" />
                      </td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="connections-table-container">
      {displayAddConnectionBtn()}
      {displayConnectionTable()}
    </div>
  );
};

export default ConnectionsTable;
