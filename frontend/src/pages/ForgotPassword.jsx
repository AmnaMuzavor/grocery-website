import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
const navigate = useNavigate();
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/auth/reset-password", {
        email,
        newPassword
      });

      alert("Password updated successfully");
        navigate("/auth/login");
    } catch (err) {
      alert("Error updating password");
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2>Reset Password</h2>

        <form  className="auth-form" onSubmit={handleReset}>
          <input
            className="form-input"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="password"
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;