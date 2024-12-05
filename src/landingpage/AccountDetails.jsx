//The Account page imports both the Login and Registration pages so that users can register for the first time or login to the web app.
//Account page displays users first/last name, email

import { useState, useEffect } from "react";
import LogInForm from "./LogInForm";
import NewUserRegistration from "./NewUserRegistration";


const AccountDetails = ({ token, setToken }) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(() => {
    const storedDetails = localStorage.getItem('userDetails');
    return storedDetails ? JSON.parse(storedDetails) : null;
  });



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
    <>
      {userDetails ? (
         <section>
         <h2>Welcome back, 
          {userDetails.firstname} 
          {userDetails.lastname}!</h2>
         <p id="p1">Email: 
          {userDetails.email}</p>
       </section>
      ) : (
        <>
          {showWelcomeMessage ? (
            <p>Welcome {username}! You can now log in below.</p>
          ) : (
            <NewUserRegistration 
              setToken={setToken} 
              onRegistrationSuccess={(username) => {
                setShowWelcomeMessage(true);
                setUsername(username);
              }} 
            />
          )}

          {token ? null : <LogInForm setToken={setToken} onLoginSuccess={handleLoginSuccess} />}
        </>
      )}
    </>
  );
};

export default AccountDetails;