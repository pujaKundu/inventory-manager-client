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

const Purchase = () => {
  let content = null;

  // if (isLoading) content = "Loading...";
  // else if (isError) content = <p className="">There was an error occurred</p>;
  // else if (products?.length === 0) content = <p>No product found!</p>;
  // else if (products?.length > 0) {
  //   content = (
  //     <TableContainer component={Paper} sx={{ width: "75vw" }}>
  //       <h3>Purchase</h3>
  //       <Link to="/addProduct">
  //         <Button
  //           variant="contained"
  //           sx={{ position: "absolute", marginLeft: "25%", marginTop: "1%" }}
  //         >
  //           <AddIcon />
  //           Add Product
  //         </Button>
  //       </Link>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell className="th">ID</TableCell>
  //             <TableCell align="left" className="th">
  //               Product name
  //             </TableCell>
  //             <TableCell align="left" className="th">
  //               Category
  //             </TableCell>
  //             <TableCell align="left" className="th">
  //               Unit price
  //             </TableCell>
  //             <TableCell align="left" className="th">
  //               Total sales
  //             </TableCell>
  //             <TableCell align="left" className="th">
  //               In stock
  //             </TableCell>
  //             <TableCell align="left" className="th">
  //               Total order
  //             </TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody></TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
  // }

  return (
    <div style={{ height: 400, width: "60%", marginLeft: "20%" }}>
      <Sidebar />
      {/* {content} */}
      purchase
    </div>
  );
};

export default Purchase;
