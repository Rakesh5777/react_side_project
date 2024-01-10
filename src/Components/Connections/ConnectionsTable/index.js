import React, { useState, useEffect } from "react";
import "./connectionsTable.scss";
// import { CONNECTIONS_DATA } from "./constants";
import rightArrowBlue from "../../../assets/rightArrowBlue.svg";
import clipboardCheck from "../../../assets/clipboardCheck.svg";
import clipboardX from "../../../assets/clipboardX.svg";
import moreOptions from "../../../assets/moreOptions.svg";
import CustomButton from "../../../Common/CustomButton";
import closeIcon from "../../../assets/closeIcon.svg";
import axios from "axios";

const ConnectionsTable = (props) => {
  const { setActiveStep, CONNECTIONS_DATA, createConnectionClick} = props;
  const [connectionsData, setConnectionsData] = useState(CONNECTIONS_DATA);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showOptionsMap, setShowOptionsMap] = useState({});
  const [showButton, setShowButton] = useState(true);

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

  const displaySuccessAddConnectionMsg = () => {

    const closeSuccessButton = () => {
      setShowButton(false);
    };
  
    return (
<>
      {createConnectionClick && showButton && (
        <div className="SuccessButton">
          <button>
            Successfully created a connection with AWS Cloud Provider.
            <span className="close-icon" onClick={closeSuccessButton}>
              <img src={closeIcon} alt="Close" />
            </span>
          </button>
        </div>
      )}
    </>
    );
  };

  const handleMoreOptionsClick = (item) => {
    setSelectedRow(item.id);
    setShowOptionsMap({
      ...showOptionsMap,
      [item.id]: !showOptionsMap[item.id],
    });
  };

  const handleOptionClick = (option) => {
    if (option === "delete") {
      const connectionToDelete = connectionsData.find(
        (item) => item.id === selectedRow
      );
      if (connectionToDelete) {
        axios
          .delete(`http://127.0.0.1:8000/remove_connection?id=${selectedRow}`)
          .then((response) => {
            const testResult = response.data
            if(testResult===false){
              throw new Error("Delete Failed, Try again")
            }
  
            const updatedConnectionsData = connectionsData.filter(
              (item) => item.id !== selectedRow
            );
            setConnectionsData(updatedConnectionsData);
  
            setConnectionsData(updatedConnectionsData);
            setShowOptionsMap({
              ...showOptionsMap,
              [selectedRow]: false,
            });
          })
          .catch((error) => {
            console.error("Error testing connection:", error);
          });
      }
      if (connectionToDelete) {
        // deleteConnection();
        const updatedConnectionsData = connectionsData.filter(
          (item) => item.id !== selectedRow
        );
        setConnectionsData(updatedConnectionsData);
      }
    }

    if (option === "test") {
      const connectionToTest = connectionsData.find(
        (item) => item.id === selectedRow
      );
  
      if (connectionToTest) {
        axios
          .post("http://localhost:8000/test_connection",{connection:connectionToTest})
          .then((response) => {
            const testResult = response?.data?.test_result
  
            const updatedConnectionsData = connectionsData.map((item) => {
              if (item.id === selectedRow) {
                if (item.connection_status !== (testResult ? "success" : "failed")) {
                  return {
                    ...item,
                    connection_status: testResult ? "success" : "failed",
                  };
                }
              }
              return item;
            });
  
            setConnectionsData(updatedConnectionsData);
            setShowOptionsMap({
              ...showOptionsMap,
              [selectedRow]: false,
            });
          })
          .catch((error) => {
            console.error("Error testing connection:", error);
          });
      }
    }
  
    setShowOptionsMap({
      ...showOptionsMap,
      [selectedRow]: false,
    });
  };

  const OptionsList = () => {
    const options = [
      { label: "Remove Connection", action: () => handleOptionClick("delete") },
      { label: "Test Connection", action: () => handleOptionClick("test") },
    ];
  
    return (
      <div className="options-list">
        {options.map((option, index) => (
          <div key={index} className="option-item" onClick={option.action}>
            <span className="option-label">{option.label}</span>
          </div>
        ))}
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
              <React.Fragment key={item.id}>
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
                    <img
                      src={moreOptions}
                      alt=""
                      onClick={() => handleMoreOptionsClick(item)}
                    />
                  {showOptionsMap[item.id] && selectedRow === item.id && (
                    <OptionsList />
                  )}
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
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="connections-table-container">
      {displaySuccessAddConnectionMsg()}
      {displayAddConnectionBtn()}
      {displayConnectionTable()}
    </div>
  );
};

export default ConnectionsTable;
