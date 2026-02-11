import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Account = () => {
  const { user, setUser } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Account</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Please login first.</p>
      )}
    </div>
  );
};

export default Account;
