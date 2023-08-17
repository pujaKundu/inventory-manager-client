import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditSupplierMutation,
  useGetSupplierQuery,
} from "../../../features/suppliers/suppliersApi";
import Sidebar from "../../Sidebar/Sidebar";
import { Button, TextField } from "@mui/material";
import Loader from "../../Shared/Loader";

const EditSupplier = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: supplier } = useGetSupplierQuery(id);

  const [editSupplier, { isSuccess }] = useEditSupplierMutation();

  const loading = !supplier;
  //states for input values
  const [supplierName, setSupplierName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      supplierName,
      contactName,
      email,
      phone,
      address,
    };
    editSupplier({ supplierId: supplier?._id, data: formData });
    setSupplierName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");

    // alert("Supplier edited successfully");
    navigate("/suppliers");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Sidebar />
      <h2>Edit supplier</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Supplier name"
            variant="outlined"
            defaultValue={supplier?.supplierName}
            required
            onChange={(e) => setSupplierName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Contact name"
            type="text"
            variant="outlined"
            defaultValue={supplier?.contactName}
            required
            onChange={(e) => setContactName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            defaultValue={supplier?.email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Phone"
            type="text"
            variant="outlined"
            defaultValue={supplier?.phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Address"
            type="text"
            variant="outlined"
            defaultValue={supplier?.address}
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

export default EditSupplier;
