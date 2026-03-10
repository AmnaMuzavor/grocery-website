import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const API = "https://grocery-website-bjbz.onrender.com";
const Login = () => {
  const { setUser } = useContext(AppContext);

  // const [email, setEmail] = useState("");
const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState({}); 

  const navigate = useNavigate();
const validate = () => {
  let newErrors = {};

  if (!emailOrPhone.trim()) {
    newErrors.email = "Email or Phone is required";
  } 
  else if (
    !/\S+@\S+\.\S+/.test(emailOrPhone) &&
    !/^[0-9]{10}$/.test(emailOrPhone)
  ) {
    newErrors.email = "Enter valid email or 10 digit phone number";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  } 
  else if (password.length < 4) {
    newErrors.password = "Password must be at least 4 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  // const validate = () => {
  //   let newErrors = {};

  //   if (!email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Invalid email format";
  //   }

  //   if (!password.trim()) {
  //     newErrors.password = "Password is required";
  //   } else if (password.length < 4) {
  //     newErrors.password = "Password must be at least 4 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await axios.post(
      "${API}/api/auth/login",
      {
        emailOrPhone: emailOrPhone.trim(),
        password: password
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);

    toast.success("Login successful");

    if (res.data.user.role === "admin") {
      navigate("/admin/categories");
    } else {
      navigate("/");
    }

  } catch (err) {

    console.log(err.response?.data);

    toast.error(
      err.response?.data?.message ||
      "Invalid credentials"
    );

  }
};


  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h1>Login</h1>

        <form className="auth-form" onSubmit={handleLogin}>
          
          {/* <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <input
  placeholder="Email or Phone"
  value={emailOrPhone}
  onChange={(e) => setEmailOrPhone(e.target.value)}
/>
{errors.email && <p style={{color:"red"}}>{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <span
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          <button className="btn btn-primary">Login</button>

          <p style={{ textAlign: "center" }}>
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
