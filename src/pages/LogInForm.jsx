//Simple input form for login accessible from the homempage
//Delete book buddy api all together or replace url?

import { useState } from "react";

const LogInForm = ({ setToken, onLoginSuccess }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const logInUser = async (event) => {
    event.preventDefault();

    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
      } else {
        console.log('Login failed');
      }
    } catch (err) {
      console.log('error');
    }
  };


  return (
    <form id="login-form" onSubmit={logInUser}>
      <input 
        placeholder="email" 
        onChange={(event) => setInputEmail(event.target.value)}
      />
      <input 
        placeholder="password" 
        type="password"
        onChange={(event) => setInputPassword(event.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogInForm;