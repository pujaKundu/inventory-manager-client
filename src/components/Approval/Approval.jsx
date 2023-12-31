import React from "react";
import ApprovalRow from "./ApprovalRow";
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
import { useGetPurchasesQuery } from "../../features/purchase/purchaseApi";
import Loader from "../Shared/Loader";

const Approval = () => {
  let content = null;
  const { data: purchases, isLoading, isError } = useGetPurchasesQuery();
  if (isLoading) content = <Loader/>
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (purchases?.length === 0) content = <p>No purchase found!</p>;
  else if (purchases?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "78vw" }}>
        <h3>Approve Purchase</h3>

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
                Supplier
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
            {purchases.map((purchase) => (
              <ApprovalRow key={purchase.id} purchase={purchase} />
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

export default Approval;
