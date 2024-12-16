import React, { useEffect, useState } from "react";

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }
  
        const response = await fetch("https://travelbug-2.onrender.com/users/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure proper formatting
          },
        });
  
        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Failed to fetch user details");
        }
  
        const details = await response.json();
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
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

export default AccountDetails;