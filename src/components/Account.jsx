import React, { useEffect, useState } from "react";
import AccountDetails from "./AccountDetails";

const Account = () => {
    const [formData, setFormData] = useState({
        registerName: '',
        registerEmail: '',
        registerUsername: '',
        registerPassword: '',
        inputUsername: '',
        inputPassword: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false); //change this back to false!

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const register = async (e) => {
        e.preventDefault();
       
       /* try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.registerName, 
                    email: formData.registerEmail,
                    username: formData.registerUsername,
                    password: formData.registerPassword
                }),
            }); */

            try {
                const response = await fetch('https://travelbug-2.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: registerName,
                        email: registerEmail,
                        username: registerUsername,
                        password: registerPassword
                    }),
                });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            } else {
                console.error('Registration failed', data);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        
        /* try {
            const response = await fetch('/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.inputUsername,
                    password: formData.inputPassword
                })
            });  */

            try {
                const userResponse = await fetch('https://travelbug-2.onrender.com/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: inputUsername,
                        password: inputPassword
                    })
                });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', formData.inputUsername);
                setIsLoggedIn(true);
            } else {
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

    return (
        <div className="account">
             {tokenPresent ? (
           // {isLoggedIn ? (           //IF TOKEN ABOVE DOESN'T WORK, TRY THIS SYNTAX INSTEAD
                <>
                    <AccountDetails />
                    <button onClick={logOut}>Logout</button>
                </>
            ) : (
                <>
                    <form onSubmit={register}>
                        <h1>New User Registration</h1>
                        <input type="text" name="registerName" value={formData.registerName} onChange={handleInputChange} placeholder="First Name" required />
                        <input type="email" name="registerEmail" value={formData.registerEmail} onChange={handleInputChange} placeholder="Email" required />
                        <input name="registerUsername" value={formData.registerUsername} onChange={handleInputChange} placeholder="Username" required />
                        <input type="password" name="registerPassword" value={formData.registerPassword} onChange={handleInputChange} placeholder="Password" required />
                        <button type="submit">Register</button>
                    </form>
                    <form onSubmit={login}>
                        <h1>Login</h1>
                        <input name="inputUsername" value={formData.inputUsername} onChange={handleInputChange} placeholder="Email" required />
                        <input type="password" name="inputPassword" value={formData.inputPassword} onChange={handleInputChange} placeholder="Password" required />
                        <button type="submit">Log In</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Account;













