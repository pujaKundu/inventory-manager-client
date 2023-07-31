import React, { useState } from "react";
import "./Configuration.scss";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Configuration = () => {
  // const [showProducts, setShowProducts] = useState(false);
  // const [showSuppliers, setShowSuppliers] = useState(false);
  // const [showClients, setShowClients] = useState(false);

  // const handleManageProducts = () => {
  //   setShowProducts(true);
  //   setShowSuppliers(false);
  //   setShowClients(false);
  // };
  return (
    <div className="container">
      <Sidebar />
      <Link to="/products" className="box">
        Manage Products
      </Link>
      <Link to='/suppliers' className="box">Manage Suppliers</Link>
      <div className="box">Manage Clients</div>
    </div>
  );
};

export default Configuration;
