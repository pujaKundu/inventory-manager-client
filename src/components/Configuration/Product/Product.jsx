import React from "react";
import { TableCell, TableRow } from "@mui/material";
import "./Product.scss";

const Product = ({ product }) => {
  const { id,name, price, totalSales, stock, totalOrder,category } = product;
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
          view
        </TableCell>
        <TableCell align="left" className="cell">
          edit
        </TableCell>
        <TableCell align="left" className="cell">
          delete
        </TableCell>
      </TableRow>
    </>
  );
};

export default Product;
