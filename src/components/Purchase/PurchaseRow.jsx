import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
        {supplier}
      </TableCell>
      <TableCell align="left" className="cell">
        {isApproved === true ? <span>Approved</span> : <span>Pending</span>}
      </TableCell>
      {/* <Link to={`/editPurchase/${id}`}>
          <TableCell align="left" className="cell">
            <EditIcon />
          </TableCell>
        </Link>
        <TableCell align="left" className="cell">
          <DeleteIcon onClick={handleDelete} />
        </TableCell> */}
    </TableRow>
  );
};

export default PurchaseRow;
