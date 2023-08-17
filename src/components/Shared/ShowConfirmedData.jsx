import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ShowPurchase = ({
  productId,
  category,
  quantity,
  priceOfSingleItem,
  vat,
  totalPrice,
  createDate,
}) => {
  let showId=productId.slice(0,5)
  return (
    <TableContainer component={Paper} sx={{ width: "75vw", marginLeft: "20%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" className="th">
              Create date
            </TableCell>
            <TableCell align="left" className="th">
              Product id
            </TableCell>
            <TableCell align="left" className="th">
              Category
            </TableCell>
            <TableCell align="left" className="th">
              Quantity
            </TableCell>
            <TableCell align="left" className="th">
              Selling price(BDT)
            </TableCell>
            <TableCell align="left" className="th">
              VAT(%)
            </TableCell>
            <TableCell align="left" className="th">
              Total price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className="cell">
              {createDate}
            </TableCell>
            <TableCell align="left" className="cell">
              {showId}
            </TableCell>
            <TableCell align="left" className="cell">
              {category}
            </TableCell>
            <TableCell align="left" className="cell">
              {quantity}
            </TableCell>
            <TableCell align="left" className="cell">
              {priceOfSingleItem}
            </TableCell>

            <TableCell align="left" className="cell">
              {vat}
            </TableCell>
            <TableCell align="left" className="cell">
              {totalPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowPurchase;
