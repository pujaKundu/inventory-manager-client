import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] =
    useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
      if (data?.accessToken && data?.user) {
        alert('login success')
    //   navigate("/login");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      
      <input
        type="email"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
