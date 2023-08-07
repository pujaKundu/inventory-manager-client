import * as React from "react";
import "../../styles/styles.scss";

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
import '../../styles/styles.scss'

const Purchase = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  let content = null;
  const { data: purchases, isLoading, isError } = useGetPurchasesQuery();

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredPurchases =
    selectedFilter === "All"
      ? purchases
      : purchases.filter((purchase) => purchase.isApproved === selectedFilter);


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
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {purchases.map((purchase) => (
              <PurchaseRow key={purchase.id} purchase={purchase} />
            ))} */}
            {filteredPurchases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>No purchases found!</TableCell>
              </TableRow>
            ) : (
              filteredPurchases.map((purchase) => (
                <PurchaseRow key={purchase.id} purchase={purchase} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "60%", marginLeft: "20%" }}>
      <Sidebar />
      <div style={{ marginTop: "1rem" }}>
        <select
          id="filter"
          name="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="filter"
        >
          <option className="filter-option" value="All">
            All
          </option>
          <option className="filter-option" value="Approved">
            Approved
          </option>
          <option className="filter-option" value="Canceled">
            Canceled
          </option>
          <option className="filter-option" value="Pending">
            Pending
          </option>
        </select>
      </div>
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
