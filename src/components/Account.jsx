import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDetails from "./AccountDetails";

const API_URL = import.meta.env.VITE_API_URL || "https://travelbug-2.onrender.com";

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registerName: "",
    registerEmail: "",
    registerUsername: "",
    registerPassword: "",
    inputEmail: "",
    inputPassword: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending payload:', {
        firstname: formData.registerName,
        email: formData.registerEmail,
        username: formData.registerUsername,
        password: formData.registerPassword,
      });
  
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.registerName,
          email: formData.registerEmail,
          username: formData.registerUsername,
          password: formData.registerPassword,
        }),
      });
  
      const data = await response.json();
      console.log('Response from backend:', data);
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setError(null);
        setStatusMessage("Registration successful. You are now logged in.");
        window.dispatchEvent(new Event("auth-change"));
      } else {
        console.error('Registration failed:', data.error);
        setError(data.error || 'Registration failed.');
        setStatusMessage("");
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      setError('An unexpected error occurred. Please try again.');
      setStatusMessage("");
    }
  };
  

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.inputEmail,
          password: formData.inputPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setError(null);
        setStatusMessage("Login successful. Redirecting to your profile...");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/myprofile");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
        setStatusMessage("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred during login.");
      setStatusMessage("");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setError(null);
    setStatusMessage("You have been logged out successfully.");
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <div className="account">
      {isLoggedIn ? (
        <>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          <AccountDetails />
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <>
          <form onSubmit={register}>
            <h1>New User Registration</h1>
            {error && <p className="error-message">{error}</p>}
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <input
              type="text"
              name="registerName"
              value={formData.registerName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
            <input
              type="email"
              name="registerEmail"
              value={formData.registerEmail}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              name="registerUsername"
              value={formData.registerUsername}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="registerPassword"
              value={formData.registerPassword}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
          <form onSubmit={login}>
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <input
              type="email"
              name="inputEmail"
              value={formData.inputEmail}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="inputPassword"
              value={formData.inputPassword}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Account;
