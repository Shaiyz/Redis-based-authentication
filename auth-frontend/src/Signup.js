import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';  // Assuming you have an AuthContext for managing user state.

export default function SignUpPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');  // Reset error before making request

        try {
            const response = await fetch('/api/signup', {  // API route to handle user signup
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);  // Set user in context upon successful signup
                history.push('/signin');  // Redirect to Sign In page
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <a href="/signin">Sign In</a>
            </p>
        </div>
    );
}