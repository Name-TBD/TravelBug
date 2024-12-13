import React, { useEffect, useState } from "react";

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const response = await fetch("https://travelbug-2.onrender.com/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
