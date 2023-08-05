import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import DonutChart from "../Dashboard/DonutChart";

const Homepage = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <Dashboard />
      <DonutChart />
    </>
  );
};

export default Homepage;
