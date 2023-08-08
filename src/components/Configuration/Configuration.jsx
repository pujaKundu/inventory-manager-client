import React, { useState } from "react";
import "./Configuration.scss";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from "@mui/icons-material/Person3";
import "../../styles/styles.scss";

const Configuration = () => {
  return (
    <div className="container ">
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/products" className="box navBox">
          <p>
            <InventoryIcon sx={{ color: "purple" }} />
          </p>
          Manage Products
        </Link>{" "}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/suppliers" className="box navBox">
          <p>
            <PersonIcon sx={{ color: "goldenrod" }} />
          </p>
          Manage Suppliers
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/clients" className="box navBox">
          <p>
            <Person3Icon sx={{ color: "navy" }} />
          </p>
          Manage Clients
        </Link>
      </div>
    </div>
  );
};

export default Configuration;
