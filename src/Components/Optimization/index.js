import React, { useEffect } from "react";
import "./optimization.scss";
import MainHeader from "../../Common/MainHeader";
import optimizationRule from "../../assets/optimizationRule.svg";
import MainContent from "../../Common/MainContent";
import axios from "axios";

const Optimization = () => {
  useEffect(() => {
    getOptimizations();
  }, []);

  const getOptimizations = () => {
    axios
      .get("http://localhost:8000/optimisations")
      .then((res) => {
        if (res?.data?.optimisations_detail?.length === 0) {
          console.log("No Optimizations");
        } else {
          console.log("Optimizations exist", res?.data?.optimisations_detail);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
        console.log("Error: No Optimizations");
      });
  };

  const getSubtitle = () => {
    return (
      <>
        <div>You don't have any Optimization rules added yet.</div>
        <div>Go ahead get started with one.</div>
      </>
    );
  };

  const displayAddTeams = () => {
    return (
      <MainContent
        titleImg={optimizationRule}
        title="Optimization Rule List"
        subtitle={getSubtitle()}
        buttonLabel="Create Rule"
        handleCustomButton={() => {}}
      />
    );
  };

  return (
    <div className="teams-container">
      <MainHeader header="Optimizations" />
      {displayAddTeams()}
    </div>
  );
};

export default Optimization;
