
/*
import { useState } from "react";

const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);   //How to connect this to routes users.js? Which variable or endpoint? Need I import loginUser above?
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
    <div className="page-container">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email: 
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password: 
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
);
};

export default Login;
*/

























/*
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

*/


