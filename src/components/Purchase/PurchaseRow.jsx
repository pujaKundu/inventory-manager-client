import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.scss";

const PurchaseRow = ({ purchase }) => {
  const {
    id,
    product,
    quantity,
    sellingPrice,
    vat,
    totalPrice,
    shippingAddress,
    supplier,
    isApproved,
  } = purchase;
  return (
    <TableRow
      className={
        isApproved === "Approved"
          ? "row-green"
          : isApproved === "Canceled"
          ? "row-red"
          : ""
      }
    >
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
    </TableRow>
  );
};

export default PurchaseRow;
