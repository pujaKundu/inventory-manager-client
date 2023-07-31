import React from "react";
import { useGetSuppliersQuery } from "../../../features/suppliers/suppliersApi";
import SupplierRow from "./SupplierRow";
import Sidebar from "../../Sidebar/Sidebar";
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

const SupplierList = () => {
  const { data: suppliers, isLoading, isError } = useGetSuppliersQuery();
  let content = null;
  if (isLoading) content = "Loading...";
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (suppliers?.length === 0) content = <p>No supplier found!</p>;
  else if (suppliers?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "75vw" }}>
        <h3>List of suppliers</h3>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="th">ID</TableCell>
                <TableCell align="left" className="th">
                  Supplier name
                </TableCell>
                <TableCell align="left" className="th">
                  Contact name
                </TableCell>
                <TableCell align="left" className="th">
                  Email
                </TableCell>
                <TableCell align="left" className="th">
                  Phone
                </TableCell>
                <TableCell align="left" className="th">
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <SupplierRow key={supplier.id} supplier={supplier} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainer>
    );
  }
  return (
    <div style={{ height: 400, width: "60%", marginLeft: "20%" }}>
      <Sidebar />
      <Link to="/addSupplier">
        <Button
          variant="contained"
          sx={{ position: "absolute", marginLeft: "25%", marginTop: "1%" }}
        >
          <AddIcon />
          Add Supplier
        </Button>
      </Link>
      {content}
    </div>
  );
};

export default SupplierList;
