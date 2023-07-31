import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetSuppliersQuery } from "../../features/suppliers/suppliersApi";
import { useGetCategoriesQuery } from "../../features/categories/catergoriesApi";
import { useAddPurchaseMutation } from "../../features/purchase/purchaseApi";
import Sidebar from "../Sidebar/Sidebar";
import { useGetProductsQuery } from "../../features/products/productsApi";

const offices = [{ id: 1, name: "MGM" }];

const CreatePurchase = () => {
  const navigate = useNavigate();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useGetProductsQuery();

  const [addPurchase] = useAddPurchaseMutation();

  const [createDate, setCreateDate] = useState("");
  const [office, setOffice] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [vat, setVat] = useState(0);

  //get today date

  if (!categories || !suppliers || !products) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      createDate,
      office,
      receiveDate,
      shippingAddress,
      category,
      product,
      quantity,
      price,
      sellingPrice,
      vat,
    };
    addPurchase(formData);
    setCreateDate("");
    setOffice("");
    setReceiveDate("");
    setShippingAddress("");
    setCategory("");
    setProduct("");
    setQuantity(0);
    setPrice(0);
    setSellingPrice(0);
    setVat(0);
  };
  return (
    <div>
      <Sidebar />
      <h2>Create purchase order</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <DatePicker
            sx={{ marginRight: "5px" }}
            label="Create date"
            value={createDate}
            required
          />
          <DatePicker
            sx={{ marginRight: "5px" }}
            label="Receive date"
            value={receiveDate}
            required
            onChange={(e) => setReceiveDate(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ margin: "5px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select product"
            value={product}
            required
            onChange={(e) => setProduct(e.target.value)}
          >
            {products.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ margin: "5px", width: "225px" }}
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
          <TextField
            sx={{ margin: "5px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select office"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {offices.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ margin: "5px" }}
            id="outlined-basic"
            label="Shipping address"
            type="text"
            variant="outlined"
            value={shippingAddress}
            required
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Price(BDT)"
            type="number"
            variant="outlined"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Selling price(BDT)"
            type="number"
            variant="outlined"
            value={sellingPrice}
            required
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="VAT"
            type="number"
            variant="outlined"
            value={vat}
            required
            onChange={(e) => setVat(e.target.value)}
          />
        </div>
        <Button sx={{ mt: 3 }} variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default CreatePurchase;
