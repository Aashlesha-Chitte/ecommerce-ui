import React, { useState } from 'react';
import './commonStyle.css';
import axios from 'axios';

const Signup = ({ handleSignupSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post('https://ecommerce-svc.vercel.app/ecommerce-ui/auth/signup', formData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);
            handleSignupSuccess();
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className='inputField'
                        placeholder='Enter your Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='inputField'
                        placeholder='Enter your Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className='inputField'
                        placeholder='Enter your Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
