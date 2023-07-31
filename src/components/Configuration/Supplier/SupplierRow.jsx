import React from "react";
import { useDeleteSupplierMutation } from "../../../features/suppliers/suppliersApi";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const SupplierRow = ({ supplier }) => {
  const { id, prodcut_name, contact_name, email, phone, address } =
    supplier || {};
  const [deleteSupplier] = useDeleteSupplierMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteSupplier(id);
  };
  return (
    <TableRow>
      <TableCell align="left" className="cell">
        {prodcut_name}
      </TableCell>
      <TableCell align="left" className="cell">
        {contact_name}
      </TableCell>
      <TableCell align="left" className="cell">
        {email}
      </TableCell>
      <TableCell align="left" className="cell">
        {phone}
      </TableCell>
      <TableCell align="left" className="cell">
        {address}
      </TableCell>
      <Link to={`/editSupplier/${id}`}>
        <TableCell align="left" className="cell">
          <EditIcon />
        </TableCell>
      </Link>
      <TableCell align="left" className="cell">
        <DeleteIcon onClick={handleDelete} />
      </TableCell>
    </TableRow>
  );
};

export default SupplierRow;
