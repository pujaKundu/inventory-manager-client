import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { useEditPurchaseStatusMutation } from "../../features/purchase/purchaseApi";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

const ApprovalRow = ({ purchase }) => {
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

  const [editPurchaseStatus, { isSuccess }] = useEditPurchaseStatusMutation();
  const [isPurchaseApproved, setIsPurchaseApproved] = useState("");

  console.log(isApproved);
  console.log("updated ", isApproved);

  const handleEditStatus = () => {
    editPurchaseStatus({ purchaseId: purchase?.id, isApproved: "Approved" });
  };
  const handleCancelStatus = () => {
    editPurchaseStatus({ purchaseId: purchase?.id, isApproved: "Canceled" });
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
          onClick={handleEditStatus}
          sx={{ color: "green", cursor: "pointer" }}
        />
      </TableCell>
      <TableCell align="left" className="cell">
        <CancelIcon
          onClick={handleCancelStatus}
          sx={{ color: "red", cursor: "pointer" }}
        />
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

export default ApprovalRow;
