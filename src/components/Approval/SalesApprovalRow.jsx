import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/styles.scss";
import { useEditSaleStatusMutation } from "../../features/sales/salesApi";

const SalesApprovalRow = ({ sale }) => {
  const {
    id,
    product,
    quantity,
    sellingPrice,
    vat,
    totalPrice,
    shippingAddress,
    client,
    isApproved,
  } = sale;

  const [editSaleStatus, { isSuccess }] = useEditSaleStatusMutation();

  const handleEditStatus = () => {
    editSaleStatus({ saleId: sale?.id, isApproved: "Approved" });
  };
  const handleCancelStatus = () => {
    editSaleStatus({ saleId: sale?.id, isApproved: "Canceled" });
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {product}
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
