import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useGetCategoriesQuery } from "../../../features/categories/catergoriesApi";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/styles.scss";
import {
  useEditProductMutation,
  useGetProductQuery,
} from "../../../features/products/productsApi";
import Loader from "../../Shared/Loader";
import Swal from "sweetalert2";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id);
  const { data: categories } = useGetCategoriesQuery();

  const [editProduct, { isSuccess }] = useEditProductMutation();

  const loading = !categories || !product;

  //states for input values
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [stock, setStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [category, setCategory] = useState("");

  // Convert the input values to numbers
  const parsedPrice = parseInt(price);
  const parsedTotalOrder = parseInt(totalOrder);
  const parsedStock = parseInt(stock);
  const parsedTotalSales = parseInt(totalSales);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price: parsedPrice,
      totalOrder: parsedTotalOrder,
      stock: parsedStock,
      totalSales: parsedTotalSales,
      category,
    };
    editProduct({ productId: product?._id, data: formData });
    setName("");
    setPrice(0);
    setTotalOrder(0);
    setStock(0);
    setTotalSales(0);
    setCategory("");

    Swal.fire("Product edited!", "success");
    navigate("/products");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Sidebar />
      <h2>Edit product</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Product name"
            variant="outlined"
            defaultValue={product?.name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Unit price"
            type="number"
            variant="outlined"
            defaultValue={product?.price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="In stock"
            type="number"
            variant="outlined"
            defaultValue={product?.stock}
            required
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Total order"
            type="number"
            variant="outlined"
            defaultValue={product?.totalOrder}
            required
            onChange={(e) => setTotalOrder(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Total sales"
            type="number"
            variant="outlined"
            defaultValue={product?.totalSales}
            required
            onChange={(e) => setTotalSales(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select category"
            defaultValue={product?.category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button sx={{ mt: 3 }} variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
