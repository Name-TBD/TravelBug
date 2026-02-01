import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://travelbug-2.onrender.com';

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
  
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch user details.');
        }
  
        const userDetails = await response.json();
        setUserDetails(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserDetails();
  }, []);
  

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Account Details</h1>
      {userDetails ? (
        <div>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          <p>Username: {userDetails.username}</p>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default AccountDetails;
