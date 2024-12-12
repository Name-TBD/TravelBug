import React, { useState, useEffect } from 'react';
import defaultProfilePic from '../assets/default-profile-pic.jpg';


  const ProfileBanner = ({ user }) => {
    if (!user) {
      return <div>Loading...</div>;
    }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
            <p>{user.firstName} {user.lastName}</p>
          </div>
        </div>
      );
    };


export default ProfileBanner;
