import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import logo from "../../assets/logo.png";
import "../../styles/styles.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data) {
      // Data is available after successful login

      navigate("/homepage");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };

  return (
    <>
      <form className="loginForm" method="POST" onSubmit={handleSubmit}>
        <div className="logoContainer">
          <img src={logo} alt="" />
          <h3 className="titleLogin">Stock Optima</h3>
        </div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          name=""
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Login;
