import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API = "https://grocery-website-bjbz.onrender.com";
const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.password) {
      newErrors.password = "Password required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("${API}/api/auth/signup", {
        name: form.name.trim(),
        email: form.email,
        phone: form.phone,
        password: form.password
      });

      // alert("Signup successful");
       toast.success("signup successful");
      navigate("/");

    } catch (err) {
     const msg = err.response?.data?.message;
  // alert(msg ? msg : "Signup failed");
  toast.error(msg ? msg : "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h1>SignUp</h1>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}/>
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}/>
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}/>
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

          <button className="btn btn-primary">Create Account</button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span style={{ color: "green", cursor: "pointer" }} onClick={() => navigate("/auth/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
