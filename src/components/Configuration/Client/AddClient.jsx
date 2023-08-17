import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAddClientMutation } from "../../../features/client/clientApi";

const AddClient = () => {
  const navigate = useNavigate();

  const [addClient, { isSuccess }] = useAddClientMutation();

  //states for input values
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern =
    /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Set the form submission flag to true

    // Validate email
    if (!emailPattern.test(email)) {
      setError("Invalid email address.");
    }

    // Validate phone number
    if (!phonePattern.test(phone)) {
      setError("Invalid phone number.");
    }

    const formData = {
      clientName,
      contactName,
      email,
      phone,
      address,
      id: Math.random(),
    };
    addClient(formData);
    setClientName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");

    alert("Client added successfully");
    navigate("/clients");
  };
  return (
    <div style={{ marginLeft: "15%" }}>
      <Sidebar />
      <h2>Add new client</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Client name"
            variant="outlined"
            value={clientName}
            required
            onChange={(e) => setClientName(e.target.value)}
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
          <p>{error}</p>
        </div>
        <Button sx={{ mt: 3 }} variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddClient;
