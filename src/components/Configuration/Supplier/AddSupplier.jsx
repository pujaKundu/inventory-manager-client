import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAddSupplierMutation } from "../../../features/suppliers/suppliersApi";

const AddSupplier = () => {
  const navigate = useNavigate();

  const [addSupplier, { isSuccess }] = useAddSupplierMutation();

  //states for input values
  const [supplierName, setSupplierName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Set the form submission flag to true

    // Validate email only when the form is submitted
    if (isFormSubmitted && !isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    const formData = {
      supplierName,
      contactName,
      email,
      phone,
      address,
    };
    addSupplier(formData);
    setSupplierName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");

    alert("Supplier added successfully");
    navigate("/suppliers");
  };
  return (
    <div style={{ marginLeft: "15%" }}>
      <Sidebar />
      <h2>Add new supplier</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Supplier name"
            variant="outlined"
            value={supplierName}
            required
            onChange={(e) => setSupplierName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Contact name"
            type="text"
            variant="outlined"
            value={contactName}
            required
            onChange={(e) => setContactName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error !== "" && <p>{error}</p>}
        <div>
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Phone"
            type="text"
            variant="outlined"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Address"
            type="text"
            variant="outlined"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <Button sx={{ mt: 3 }} variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddSupplier;
