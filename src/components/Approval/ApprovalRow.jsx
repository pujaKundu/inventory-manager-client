import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { useEditPurchaseStatusMutation } from "../../features/purchase/purchaseApi";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/styles.scss";
import {
  useEditProductStockPurchaseMutation,
  useGetProductQuery,
} from "../../features/products/productsApi";

const ApprovalRow = ({ purchase }) => {
  const {
    _id,
    productId,
    quantity,
    sellingPrice,
    vat,
    totalPrice,
    shippingAddress,
    supplier,
    isApproved,
  } = purchase;

  const [editPurchaseStatus, { isSuccess }] = useEditPurchaseStatusMutation();

  //for product stock update

  const { data: productData } = useGetProductQuery(productId);
  const [editProductStockPurchase] = useEditProductStockPurchaseMutation();

  const qty = parseInt(quantity);
  const updatedOrder = productData?.totalOrder + totalPrice;

  const handleEditStatus = async () => {
    // editPurchaseStatus({ purchaseId: purchase?.id, isApproved: "Approved" });
    try {
      await editPurchaseStatus({
        purchaseId: purchase?._id,
        isApproved: "Approved",
      });

      // Update the product's stock
      await editProductStockPurchase({
        productId: productData._id,
        stock: productData.stock + qty,
        totalOrder: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating sale status or product stock:", error);
    }
  };
  const handleCancelStatus = async () => {
    try {
      // Check if the sale is already approved before canceling
      if (isApproved === "Approved") {
        // Update the sale status to "Canceled"
        await editPurchaseStatus({ purchaseId: _id, isApproved: "Canceled" });

        // Update the product's stock and total order back to original values
        await editProductStockPurchase({
          productId: productData._id,
          stock: productData.stock - qty,
          totalOrder: productData.totalOrder - totalPrice,
        });
      } else {
        // If the sale is not approved, simply update the sale status to "Canceled"
        await editPurchaseStatus({ purchaseId: _id, isApproved: "Canceled" });
      }
    } catch (error) {
      console.error("Error updating purchase status or product stock:", error);
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
        {supplier}
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

export default ApprovalRow;
