import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
    const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;

      console.log("Form Data:", form);


    }

    try {
      await axios.post("http://localhost:5001/api/auth/signup", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      });

      alert("Signup successful");
    } catch (err) {
      // alert("Signup failed");
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <div className="logo">
          <h1>SignUp</h1>
        </div>

        <div className="signupform-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <input className="form-input"
              name="name"
              placeholder="Name"
              value={form.name} onChange={handleChange} required />

            <input className="form-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

            <input className="form-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

            <input className="form-input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

            <input className="form-input" name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

            <button className="btn btn-primary">Create Account</button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => navigate("/auth/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
