import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useGetCategoriesQuery } from "../../../features/categories/catergoriesApi";
import { useAddProductMutation } from "../../../features/products/productsApi";
import { useNavigate } from "react-router-dom";
import "../../../styles/styles.scss";
import Loader from "../../Shared/Loader";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const AddProduct = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const [
    addProduct,
    { isSuccess, isLoading: addProductLoading, isError: addProductError },
  ] = useAddProductMutation();

  if (!categories) {
    return <Loader />;
  }
  //states for input values
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [stock, setStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price,
      totalOrder,
      stock,
      totalSales,
      category,
    };
    addProduct(formData);
    setName("");
    setPrice(0);
    setTotalOrder(0);
    setStock(0);
    setTotalSales(0);
    setCategory("");

    alert("Product added successfully");

    navigate("/products");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    // Handle error case
    return <div>Error loading categories</div>;
  }

  return (
    <div style={{ marginLeft: "15%" }}>
      <Sidebar />

      <h2>Add new product</h2>

      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Product name"
            variant="outlined"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Unit price"
            type="number"
            variant="outlined"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="In stock"
            type="number"
            variant="outlined"
            value={stock}
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
            value={totalOrder}
            required
            onChange={(e) => setTotalOrder(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Total sales"
            type="number"
            variant="outlined"
            value={totalSales}
            required
            onChange={(e) => setTotalSales(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button sx={{ mt: 3 }} variant="contained" type="submit">
          Save
        </Button>{" "}
      </form>
    </div>
  );
};

export default AddProduct;
