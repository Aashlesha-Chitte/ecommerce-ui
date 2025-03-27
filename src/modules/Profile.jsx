import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://ecommerce-svc.vercel.app/ecommerce-ui/auth/user/${id}`);
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {userProfile ? (
        <div className="profile-details">
          <p>Name: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
        </div>
      ) : (
        <p className="loading-message">Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
