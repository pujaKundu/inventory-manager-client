import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar";
import { Button, TextField } from "@mui/material";
import {
  useEditClientMutation,
  useGetClientQuery,
} from "../../../features/client/clientApi";
import Loader from "../../Shared/Loader";
import Swal from "sweetalert2";

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: client } = useGetClientQuery(id);

  const [editClient, { isSuccess }] = useEditClientMutation();

  const loading = !client;
  //states for input values
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      clientName,
      contactName,
      email,
      phone,
      address,
    };
    editClient({ clientId: client?._id, data: formData });
    setClientName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");

    Swal.fire("Client edited!", "success");
    navigate("/clients");
  };

  if (loading) {
    return <Loader/>;
  }
  return (
    <div>
      <Sidebar />
      <h2>Edit client</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Client name"
            variant="outlined"
            defaultValue={client?.clientName}
            required
            onChange={(e) => setClientName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Contact name"
            type="text"
            variant="outlined"
            defaultValue={client?.contactName}
            required
            onChange={(e) => setContactName(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            defaultValue={client?.email}
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
            defaultValue={client?.phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Address"
            type="text"
            variant="outlined"
            defaultValue={client?.address}
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

export default EditClient;
