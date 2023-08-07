import { Alert, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/categories/catergoriesApi";
import { useGetClientsQuery } from "../../features/client/clientApi";
import { useAddSaleMutation } from "../../features/sales/salesApi";
import Sidebar from "../Sidebar/Sidebar";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { calculateTotalPrice } from "../../../utils/calculateVat";
import ShowConfirmedData from "../Shared/ShowConfirmedData";

const offices = [{ id: 1, name: "MGM" }];

const CreateSales = () => {
  const navigate = useNavigate();
  //get today date
  const currDate = new Date();
  const formattedDate = currDate.toISOString().split("T")[0];

  const { data: clients } = useGetClientsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useGetProductsQuery();

  const [addSale] = useAddSaleMutation();

  const [createDate, setCreateDate] = useState(formattedDate);
  const [office, setOffice] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [message, setMessage] = useState("");

  const isApproved = false;

  const totalPrice = calculateTotalPrice(quantity, sellingPrice, vat);

  if (sellingPrice < 0 || quantity < 0) {
    alert("Please enter non-negative value");
  }

  if (!categories || !clients || !products) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      createDate: formattedDate,
      office,
      receiveDate,
      shippingAddress,
      category,
      product,
      quantity,
      client,
      sellingPrice,
      vat,
      isApproved,
      totalPrice,
    };
    addSale(formData);
    setCreateDate("");
    setOffice("");
    setReceiveDate("");
    setShippingAddress("");
    setCategory("");
    setClient("");
    setProduct("");
    setQuantity(0);
    setPrice(0);
    setSellingPrice(0);
    setVat(0);

    //notification
    alert("Sales order created");
    navigate("/sales");
  };
  return (
    <div>
      <Sidebar />
      <h3 sx={{ position: "absolute", left: 0, marginLeft: "4%" }}>
        Create sales order
      </h3>

      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <label>Create date</label>
          <TextField
            type="date"
            sx={{
              marginLeft: "-6.4%",
              width: "225px",
              marginTop: "2%",
              marginRight: "2%",
            }}
            value={formattedDate}
            required
            disabled
          />
          <label>Receive date</label>
          <TextField
            type="date"
            sx={{
              marginLeft: "-7%",
              width: "225px",
              marginTop: "2%",
            }}
            value={receiveDate}
            required
            onChange={(e) => setReceiveDate(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ margin: "15px", width: "225px", marginLeft: "20%" }}
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
            sx={{ margin: "15px", width: "225px" }}
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
            sx={{ margin: "15px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select office"
            value={office}
            required
            onChange={(e) => setOffice(e.target.value)}
          >
            {offices.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ margin: "15px", width: "225px" }}
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
            sx={{ margin: "15px", marginLeft: "20%", width: "225px" }}
            id="outlined-basic"
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
          />

          <TextField
            sx={{ margin: "15px", width: "225px" }}
            id="outlined-basic"
            label="Selling price(BDT)"
            type="number"
            variant="outlined"
            value={sellingPrice}
            required
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <TextField
            sx={{ margin: "15px", width: "225px" }}
            id="outlined-basic"
            label="VAT(%)"
            type="number"
            variant="outlined"
            value={vat}
            required
            onChange={(e) => setVat(e.target.value)}
          />
          <TextField
            sx={{ margin: "15px", width: "225px" }}
            id="outlined-select-category"
            select
            label="Select client"
            value={client}
            required
            onChange={(e) => setClient(e.target.value)}
          >
            {clients.map((option) => (
              <MenuItem key={option.id} value={option.clientName}>
                {option.clientName}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <h5>Confirm order</h5>
          <ShowConfirmedData
            product={product}
            category={category}
            quantity={quantity}
            priceOfSingleItem={sellingPrice}
            vat={vat}
            totalPrice={totalPrice}
            createDate={createDate}
          />
        </div>
        <Button
          sx={{ mt: 3, right: 0, position: "absolute", marginRight: "4%" }}
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default CreateSales;
