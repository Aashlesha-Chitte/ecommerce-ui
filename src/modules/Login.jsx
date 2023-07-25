import React, { useState } from 'react';
import axiosInstance from '../api';
import './commonStyle.css';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      handleLogin();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-form" >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email">Email:</label>
         <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            className='inputField'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="password">Password:</label>
         <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            className='inputField'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
