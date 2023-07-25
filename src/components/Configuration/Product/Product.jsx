import React from "react";
import { TableCell, TableRow } from "@mui/material";
import "./Product.scss";

const Product = ({ product }) => {
  const { name, price, totalSales, instock, totalOrder } = product;
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right" className="cell">
          {price}
        </TableCell>
        <TableCell align="right" className="cell">
          {totalSales}
        </TableCell>
        <TableCell align="right" className="cell">
          {instock}
        </TableCell>
        <TableCell align="right" className="cell">
          {totalOrder}
        </TableCell>
        <TableCell align="right" className="cell">
          view
        </TableCell>
        <TableCell align="right" className="cell">
          edit
        </TableCell>
        <TableCell align="right" className="cell">
          delete
        </TableCell>
      </TableRow>
      
    </>
  );
};

export default Product;
