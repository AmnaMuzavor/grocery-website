import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <div className="logo">
          <h1>Login</h1>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <input  className="form-input" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
