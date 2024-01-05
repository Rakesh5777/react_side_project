import React from "react";
import "./landingPage.scss";
import wayamIcon from "../../assets/wayamIcon.svg";
import wayamText from "../../assets/wayamText.svg";
import { Navigate, useNavigate } from "react-router-dom";
import CustomButton from "../../Common/CustomButton";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginBtn = () => {
    navigate("/dashboard");
  };
  // React.useEffect(()=>{
  //   handleLoginBtn()
  // },[])

  return (
    <div>
      {/* using conditional rendering we can change the behaviour of rendering */}
      {true && <Navigate to="/dashboard"/>}
      <div className="landing-page-container">
        <div style={{ width: "100%" }}>
          <div className="langing-page-header">
            <img alt="" src={wayamIcon} />{" "}
            <img alt="" src={wayamText} style={{ marginLeft: "47.8px" }} />
          </div>

          <div className="landing-page-login-content">
            <div>
              <div className="landing-page-login-content-text">Login Page</div>
              <CustomButton
                label="Let's Go"
                handleCustomButton={handleLoginBtn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
