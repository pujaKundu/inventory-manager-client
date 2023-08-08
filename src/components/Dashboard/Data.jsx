import React from "react";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import { useGetProductsQuery } from "../../features/products/productsApi";

const Data = () => {
  const { data: products } = useGetProductsQuery();
  const totalSalesAll = products.reduce((a, b) => a + b.totalSales, 0);
  const totalPurchaseAll = products.reduce((a, b) => a + b.totalOrder, 0);
  
  return (
    <div style={{ display: "flex", marginBottom: "25px" }}>
      <div
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "5px",
          padding: "10px",
          marginRight: "10px",
          width: "200px",
        }}
      >
        <p>{totalSalesAll} BDT</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DataThresholdingIcon
            sx={{ color: "goldenrod", marginRight: "5px" }}
          />
          Total sales
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "5px",
          padding: "10px",
          width: "200px",
        }}
      >
        <p>{totalPurchaseAll} BDT</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DataThresholdingIcon sx={{ color: "purple", marginRight: "5px" }} />
          Total purchase
        </div>
      </div>
    </div>
  );
};

export default Data;
