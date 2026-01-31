
import { useEffect, useState } from "react";  

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async (token) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "https://travelbug-2.onrender.com"}/users/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user details.");
    }
    return response.json();
  };


  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const details = await getUserDetails(token);
        setUserDetails(details);
      } catch (err) {
        console.error("Error", err)
      }
    };
    fetchUserDetails();
  }, []);



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
        <p>You are not logged in.</p>
      )}
    </div>
  </div>
);
};

export default Account
