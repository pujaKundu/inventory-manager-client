import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import SalesApprovalRow from "../../components/Approval/SalesApprovalRow";
import { useGetSalesQuery } from "../../features/sales/salesApi";
import Loader from "../Shared/Loader";

const SalesApproval = () => {
  let content = null;
  const { data: sales, isLoading, isError } = useGetSalesQuery();

  if (isLoading) content = <Loader />;
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (sales?.length === 0) content = <p>No sales found!</p>;
  else if (sales?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "78vw" }}>
        <h3>Approve Sales</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" className="th title">
                Product id
              </TableCell>
              <TableCell align="left" className="th title">
                Product name
              </TableCell>
              <TableCell align="left" className="th title">
                Quantity
              </TableCell>
              <TableCell align="left" className="th title">
                Unit price
              </TableCell>
              <TableCell align="left" className="th title">
                Vat(%)
              </TableCell>
              <TableCell align="left" className="th title">
                Total price
              </TableCell>
              <TableCell align="left" className="th title">
                Shiping address
              </TableCell>
              <TableCell align="left" className="th title">
                Client
              </TableCell>
              <TableCell align="left" className="th title">
                Status
              </TableCell>
              <TableCell align="left" className="th title">
                Approve
              </TableCell>
              <TableCell align="left" className="th title">
                Cancel
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <SalesApprovalRow key={sale.id} sale={sale} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <div style={{ height: 400, width: "60%", marginLeft: "20%" }}>
      <Sidebar />
      {content}
    </div>
  );
};

export default SalesApproval;
