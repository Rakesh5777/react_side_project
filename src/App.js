import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import SideBar from "./Components/SideBar";
import { SIDEBAR_LIST } from "./Components/SideBar/constants";

function App() {
  const getRoutes = (item, ind) => {
    return (
      <Route exact key={ind} path={item.path} element={<item.renderTo />} />
    );
  };

  const renderRoutes = SIDEBAR_LIST.map((item, index) => {
    if (item.subtitle?.length !== 0) {
      return item.subtitle.map((ele, ind) => {
        return getRoutes(ele, ind);
      });
    } else {
      return getRoutes(item, index);
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <Router>
      
        <SideBar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/home" exact element={<LandingPage />} />
          {renderRoutes}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
