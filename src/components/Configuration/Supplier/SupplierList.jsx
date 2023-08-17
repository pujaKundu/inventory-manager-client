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
import Loader from "../../Shared/Loader";

const SupplierList = () => {
  const { data: suppliers, isLoading, isError } = useGetSuppliersQuery();
  let content = null;
  if (isLoading) content = <Loader/>
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
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Supplier name
                </TableCell>
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Contact name
                </TableCell>
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <SupplierRow key={supplier._id} supplier={supplier} />
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
          sx={{ position: "absolute", marginLeft: "30%", marginTop: "1%" }}
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
