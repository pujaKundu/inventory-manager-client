import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import StoreIcon from "@mui/icons-material/Store";
import SellIcon from "@mui/icons-material/Sell";
import "../../styles/styles.scss";

const ApproveNavigation = () => {
  return (
    <div style={{ display: "flex", marginLeft: "15%", marginTop: "11%" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/approve-purchase" className="box navBox">
          <p>
            <StoreIcon sx={{ color: "purple" }} />
          </p>
          Manage purchase
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {" "}
        <Link to="/approve-sales" className="box navBox">
          <p>
            <SellIcon sx={{ color: "goldenRod" }} />
          </p>
          Manage sales
        </Link>
      </div>
    </div>
  );
};

export default ApproveNavigation;
