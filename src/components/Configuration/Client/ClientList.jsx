import React from "react";
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
import { useGetClientsQuery } from "../../../features/client/clientApi";
import ClientRow from "./ClientRow";

const ClientList = () => {
  const { data: clients, isLoading, isError } = useGetClientsQuery();
  let content = null;
  if (isLoading) content = "Loading...";
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (clients?.length === 0) content = <p>No client found!</p>;
  else if (clients?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "75vw" }}>
        <h3>List of clients</h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  className="th"
                  sx={{ fontWeight: "bold" }}
                >
                  Client name
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
              {clients.map((client) => (
                <ClientRow key={client.id} client={client} />
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
      <Link to="/addClient">
        <Button
          variant="contained"
          sx={{ position: "absolute", marginLeft: "30%", marginTop: "1%" }}
        >
          <AddIcon />
          Add Client
        </Button>
      </Link>
      {content}
    </div>
  );
};

export default ClientList;
