
import { useState } from "react";

const Register = () => {
  const[firstname, setFirstname] = useState('')
  const[lastname, setLastname] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();

    const userData = { firstname, lastname, email, password };
    try {
      const response = await registerUser(userData);  // //How to connect registerUser to routes users.js? Which variable or endpoint?Need i import registerUser above?
      if (response.message === 'Registration successful') {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.message);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  return(
    <div className="page-container">
      <div className="login-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              placeholder="First Name"
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit">Register New Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;















