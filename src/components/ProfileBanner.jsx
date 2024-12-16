import React, { useState, useEffect } from 'react';
import defaultProfilePic from '../assets/default-profile-pic.jpg';

const ProfileBanner = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://travelbug-2.onrender.com/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="profile-banner">
      <img
        src={user.profileImage || defaultProfilePic}
        alt="Profile"
        className="profile-image"
      />
      <div className="user-info">
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default ProfileBanner;
