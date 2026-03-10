import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await axios.post("${API}/api/auth/reset-password", {
        token,
        newPassword
      });

      alert("Password reset successful");
      navigate("/auth/login");
    } catch (err) {
      alert("Invalid or expired token");
      console.log("TOKEN FROM URL:", token);
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2>Reset Password</h2>

        <form className="auth-form" onSubmit={handleReset}>
          
          {/* Password Field */}
          <div style={{ position: "relative" }}>
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
                color: "#555"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
