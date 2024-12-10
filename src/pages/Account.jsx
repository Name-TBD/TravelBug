
import React from "react";
import { useEffect, useState } from "react";  

const Account = () => {
  const [userDetails, setUserDetails] = useState('')


  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const details = await getUserDetails(token);  //Need i import getUserDetails above?
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
      )};
    </div>
  </div>
);
};

export default Account
