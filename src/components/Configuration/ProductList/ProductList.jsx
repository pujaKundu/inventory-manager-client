import * as React from "react";
import { useGetProductsQuery } from "../../../features/products/productsApi";
import Product from "../Product/Product";
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
import Sidebar from "../../Sidebar/Sidebar";
import "../../../styles/styles.scss";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  let content = null;

  if (isLoading) content = "Loading...";
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (products?.length === 0) content = <p>No product found!</p>;
  else if (products?.length > 0) {
    content = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="th">Name</TableCell>
              <TableCell align="right" className="th">
                Unit price
              </TableCell>
              <TableCell align="right" className="th">
                Total sales
              </TableCell>
              <TableCell align="right" className="th">
                In stock
              </TableCell>
              <TableCell align="right" className="th">
                Total order
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Product key={product.id} product={product} />
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

export default ProductList;
