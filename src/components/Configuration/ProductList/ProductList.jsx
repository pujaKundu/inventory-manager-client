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
import { Link } from "react-router-dom";
import "../../../styles/styles.scss";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../Shared/Loader";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  let content = null;

  if (isLoading) content = <Loader />;
  else if (isError) content = <p className="">There was an error occurred</p>;
  else if (products?.length === 0) content = <p>No product found!</p>;
  else if (products?.length > 0) {
    content = (
      <TableContainer component={Paper} sx={{ width: "75vw" }}>
        <h3>Products</h3>
        <Link to="/addProduct">
          <Button
            variant="contained"
            sx={{ position: "absolute", marginLeft: "25%", marginTop: "1%" }}
          >
            <AddIcon />
            Add Product
          </Button>
        </Link>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="th title">ID</TableCell>
              <TableCell align="left" className="th title">
                Product name
              </TableCell>
              <TableCell align="left" className="th title">
                Category
              </TableCell>
              <TableCell align="left" className="th title">
                Unit price
              </TableCell>
              <TableCell align="left" className="th title">
                Total sales
              </TableCell>
              <TableCell align="left" className="th title">
                In stock
              </TableCell>
              <TableCell align="left" className="th title">
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
