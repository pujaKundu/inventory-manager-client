import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/styles.scss";
import { useEditSaleStatusMutation } from "../../features/sales/salesApi";
import {
  useEditProductStockMutation,
  useGetProductQuery,
} from "../../features/products/productsApi";

const SalesApprovalRow = ({ sale }) => {
  const {
    id,
    productId,
    quantity,
    sellingPrice,
    vat,
    totalPrice,
    shippingAddress,
    client,
    isApproved,
  } = sale;

  const [editSaleStatus, { isSuccess }] = useEditSaleStatusMutation();
  //for product stock update

  const { data: productData } = useGetProductQuery(productId);
  const [editProductStock] = useEditProductStockMutation();

  const qty = parseInt(quantity);

  const updatedSales = productData?.totalSales + totalPrice;

  const handleEditStatus = async () => {
    try {
      // Check if the product has enough stock
      if (productData && productData.stock >= qty) {
        // If yes, update the sale status to "Approved"
        await editSaleStatus({ saleId: id, isApproved: "Approved" });

        // Update the product's stock
        await editProductStock({
          productId: productData.id,
          stock: productData.stock - qty,
          totalSales: updatedSales,
        });
      } else {
        alert("Insufficient stock for the product:");
      }
    } catch (error) {
      console.error("Error updating sale status or product stock:", error);
    }
  };
  const handleCancelStatus = async () => {
    try {
      // Check if the sale is already approved before canceling
      if (isApproved === "Approved") {
        // Update the sale status to "Canceled"
        await editSaleStatus({ saleId: id, isApproved: "Canceled" });

        // Update the product's stock and totalSales back to original values
        await editProductStock({
          productId: productData.id,
          stock: productData.stock + qty,
          totalSales: productData.totalSales - totalPrice,
        });
      } else {
        // If the sale is not approved, simply update the sale status to "Canceled"
        await editSaleStatus({ saleId: id, isApproved: "Canceled" });
      }
    } catch (error) {
      console.error("Error updating sale status or product stock:", error);
    }
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {productId}
      </TableCell>
      <TableCell component="th" scope="row">
        {productData?.name}
      </TableCell>
      <TableCell align="left" className="cell">
        {quantity}
      </TableCell>
      <TableCell align="left" className="cell">
        {sellingPrice}
      </TableCell>
      <TableCell align="left" className="cell">
        {vat}
      </TableCell>
      <TableCell align="left" className="cell">
        {totalPrice}
      </TableCell>
      <TableCell align="left" className="cell">
        {shippingAddress}
      </TableCell>
      <TableCell align="left" className="cell">
        {client}
      </TableCell>
      <TableCell align="left" className="cell">
        {isApproved === "Approved" ? (
          <span style={{ color: "#208a2e", fontWeight: "bold" }}>Approved</span>
        ) : isApproved === "Canceled" ? (
          <span style={{ color: "#eb4034", fontWeight: "bold" }}>Canceled</span>
        ) : (
          <span style={{ color: "#e6bf27", fontWeight: "bold" }}>Pending</span>
        )}
      </TableCell>
      <TableCell align="left" className="cell">
        <DoneIcon
          className="icon"
          onClick={handleEditStatus}
          sx={{ color: "#208a2e", cursor: "pointer" }}
        />
      </TableCell>
      <TableCell align="left" className="cell">
        <CancelIcon
          className="icon"
          onClick={handleCancelStatus}
          sx={{ color: "#eb4034", cursor: "pointer" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default SalesApprovalRow;
