import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

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
      navigate("/");
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
          <input className="form-input" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />

          
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px" }}> <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} style={{ marginRight: "5px" }} /> Remember me </label>
  <a href="/forgot-password">Forgot password?</a>
</div>
          
          <button className="btn btn-primary">Login</button>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => navigate("/auth/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
