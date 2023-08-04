import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const ApproveNavigation = () => {
  return (
    <div>
      <Sidebar />
      <Link to="/approve-purchase">
        <Button>Manage purchase</Button>
      </Link>
      {/* <Link to="/approve-sales">
        <Button>Manage sales</Button>
      </Link> */}
    </div>
  );
};

export default ApproveNavigation;
