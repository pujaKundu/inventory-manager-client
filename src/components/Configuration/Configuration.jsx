import React, { useState } from "react";
import "./Configuration.scss";
import ProductList from "./ProductList/ProductList";

const Configuration = () => {
  const [showProducts, setShowProducts] = useState(false);

  const handleManageProducts = () => {
    setShowProducts(true);
  };
  return (
    <div className="container">
      <div className="box" onClick={handleManageProducts}>
        Manage Products
      </div>
      {showProducts && <ProductList />}
      <div className="box">Manage Suppliers</div>
      <div className="box">Manage Clients</div>
    </div>
  );
};

export default Configuration;
