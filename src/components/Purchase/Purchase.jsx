import * as React from "react";

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

import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../Sidebar/Sidebar";
import { useGetPurchasesQuery } from "../../features/purchase/purchaseApi";
import PurchaseRow from "./PurchaseRow";

const Purchase = () => {
  let content = null;
  const { data: purchases ,isLoading,isError} = useGetPurchasesQuery();
  if (isLoading) content = "Loading...";
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (purchases?.length === 0) content = <p>No purchase found!</p>;
  else if (purchases?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "75vw" }}>
        <h3>Purchase</h3>
        
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell align="left" className="th">
                Product name
              </TableCell>
              <TableCell align="left" className="th">
                Quantity
              </TableCell>
              <TableCell align="left" className="th">
                Unit price
              </TableCell>
              <TableCell align="left" className="th">
                Vat(%)
              </TableCell>
              <TableCell align="left" className="th">
                Total price
              </TableCell>
              <TableCell align="left" className="th">
                Shiping address
              </TableCell>
              <TableCell align="left" className="th">
                Supplier
              </TableCell>
              <TableCell align="left" className="th">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <PurchaseRow key={purchase.id} purchase={purchase} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "60%", marginLeft: "20%" }}>
      <Sidebar />
      <Link to="/createPurchase">
        <Button
          variant="contained"
          sx={{ position: "absolute", marginLeft: "25%", marginTop: "1%" }}
        >
          <AddIcon />
          Create purchase order
        </Button>
      </Link>
      {content}
    
    </div>
  );
};

export default Purchase;
