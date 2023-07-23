import * as React from "react";
import { useGetProductsQuery } from "../../../features/products/productsApi";
import Product from "../Product/Product";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  let content = null;
  if (isLoading) content = "Loading...";

  if (!isLoading && isError)
    content = <p className="">There was an error occured</p>;

  if (!isLoading && !isError && products?.length === 0) {
    content = <p>No product found!</p>;
  }

  if (!isLoading && !isError && products?.length > 0) {
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.totalOrder}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
 
  return (
    <div style={{ height: 400, width: "100%" }}>
      {content}
    </div>
  );
};

export default ProductList;
