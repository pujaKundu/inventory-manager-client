import React, { useState } from "react";
import "./Configuration.scss";
import ProductList from "./ProductList/ProductList";
import { Link } from "react-router-dom";

const Configuration = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showSuppliers, setShowSuppliers] = useState(false);
  const [showClients, setShowClients] = useState(false);

  const handleManageProducts = () => {
    setShowProducts(true);
    setShowSuppliers(false);
    setShowClients(false);
  };
  return (
    <div className="container">
      <Link to='/products' className="box" onClick={handleManageProducts}>
        Manage Products
      </Link>  
      <div className="box">Manage Suppliers</div>
      <div className="box">Manage Clients</div>
    </div>
  );
};

export default Configuration;
