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
import { useGetSalesQuery } from "../../features/sales/salesApi";
import "../../styles/styles.scss";
import SelectMenu from "../Shared/SelectMenu";
import SalesRow from "./SalesRow";
import Loader from "../Shared/Loader";

const Sales = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  let content = null;
  const { data: sales, isLoading, isError } = useGetSalesQuery();
  //get filtered data
  const filteredSales =
    selectedFilter === "All"
      ? sales
      : sales.filter((sale) => sale.isApproved === selectedFilter);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  if (isLoading) content = <Loader />;
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (sales?.length === 0) content = <p>No sales found!</p>;
  else if (sales?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "78vw" }}>
        <h3>Sales</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" className="th title">
                Product id
              </TableCell>
              <TableCell align="left" className="th title">
                Category
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
            {filteredSales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>No sales found!</TableCell>
              </TableRow>
            ) : (
              filteredSales.map((sale) => (
                <SalesRow key={sale._id} sale={sale} />
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

      <SelectMenu
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />

      <Link to="/create-sales">
        <Button
          variant="contained"
          sx={{ position: "absolute", marginLeft: "25%", marginTop: "1%" }}
        >
          <AddIcon />
          Create sale order
        </Button>
      </Link>
      {content}
    </div>
  );
};

export default Sales;
