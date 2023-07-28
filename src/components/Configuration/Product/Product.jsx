import React from "react";
import { TableCell, TableRow } from "@mui/material";
import "./Product.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteProductMutation } from "../../../features/products/productsApi";

const Product = ({ product }) => {
  const { id, name, price, totalSales, stock, totalOrder, category } = product || {};
  const [deleteProduct]=useDeleteProductMutation()
  const handleDelete = (e) => {
    e.preventDefault();
deleteProduct(id)
  }
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="left" className="cell">
          {name}
        </TableCell>
        <TableCell align="left" className="cell">
          {category}
        </TableCell>
        <TableCell align="left" className="cell">
          {price}
        </TableCell>
        <TableCell align="left" className="cell">
          {totalSales}
        </TableCell>
        <TableCell align="left" className="cell">
          {stock}
        </TableCell>
        <TableCell align="left" className="cell">
          {totalOrder}
        </TableCell>

        <TableCell align="left" className="cell">
          <EditIcon />
        </TableCell>
        <TableCell align="left" className="cell">
          <DeleteIcon onClick={handleDelete} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default Product;
