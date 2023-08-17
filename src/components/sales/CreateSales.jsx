import { Alert, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/categories/catergoriesApi";
import { useGetClientsQuery } from "../../features/client/clientApi";
import { useAddSaleMutation } from "../../features/sales/salesApi";
import Sidebar from "../Sidebar/Sidebar";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { calculateTotalPrice } from "../../../utils/calculateVat";
import ShowConfirmedData from "../Shared/ShowConfirmedData";
import Loader from "../Shared/Loader";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const offices = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Rajshahi" },
];

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
  const [productId, setProductId] = useState("");

  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [message, setMessage] = useState("");

  const isApproved = "Pending";
  

  const totalPrice = calculateTotalPrice(quantity, sellingPrice, vat);

  if (sellingPrice < 0 || quantity < 0 || vat < 0) {
    alert("Please enter non-negative value");
  }

  if (!categories || !clients || !products) {
    return <Loader />;
  }

  const id = Math.random();
  const handleSubmit = (e) => {
    e.preventDefault();
    //generate unique id
    const id = uuidv4();
    const formData = {
      createDate: formattedDate,
      office,
      receiveDate,
      shippingAddress,
      category,
      productId,
      quantity: parseInt(quantity),
      client,
      sellingPrice: parseFloat(sellingPrice),
      vat: parseInt(vat),
      isApproved,
      totalPrice: parseFloat(totalPrice),
      id,
    };

    addSale(formData);
    setCreateDate("");
    setOffice("");
    setReceiveDate("");
    setShippingAddress("");
    setCategory("");
    setClient("");
    setProductId("");
    setQuantity(0);
    setSellingPrice(0);
    setVat(0);

    //notification
    Swal.fire("Sales order created successfully!", "success");
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
            value={productId}
            required
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map((option) => (
              <MenuItem key={option._id} value={option._id}>
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
              <MenuItem key={option._id} value={option.name}>
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
              <MenuItem key={option._id} value={option.clientName}>
                {option.clientName}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <h5>Confirm order</h5>
          <ShowConfirmedData
            productId={productId}
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
