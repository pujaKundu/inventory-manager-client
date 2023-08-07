import React from "react";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useDeleteClientMutation } from "../../../features/client/clientApi";

const ClientRow = ({ client }) => {
  const { id, clientName, contactName, email, phone, address } = client || {};
  const [deleteClient] = useDeleteClientMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteClient(id);
  };
  return (
    <TableRow>
      <TableCell align="left" className="cell">
        {clientName}
      </TableCell>
      <TableCell align="left" className="cell">
        {contactName}
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
      <Link to={`/editClient/${id}`}>
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

export default ClientRow;
