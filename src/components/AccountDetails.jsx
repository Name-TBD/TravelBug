import React, { useEffect, useState } from "react";

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure the token is stored
      if (!token) {
        throw new Error("No token found. User not authenticated.");
      }

      const response = await fetch("https://travelbug-2.onrender.com/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token here
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const details = await response.json();
      setUserDetails(details);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  fetchUserDetails();
}, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <div className="account-container">
        <h2>Account Info</h2>
        {userDetails ? (
          <div>
            <p>First Name: {userDetails.firstname}</p>
            <p>Last Name: {userDetails.lastname}</p>
            <p>Email: {userDetails.email}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Account;
