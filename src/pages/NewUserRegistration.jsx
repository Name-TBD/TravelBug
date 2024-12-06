//Input form for user registration to be access in AccountDetails page

import { useState } from "react";

const NewUserRegistration = ({ setToken, onRegistrationSuccess }) => {
  const [inputFirst, setInputFirst] = useState('');
  const [inputLast, setInputLast] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const registerNewUser = async (event) => {
    event.preventDefault();

    const userData = { firstname, lastname, email, password };
    try {
      const response = await registerNewUser(userData);   //Registeruser was a placeholder for api route
      if (response.message === 'Registration successful') {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.message);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };



  return (
    <>
      <h1>New User Registration</h1>

      <form id="registration-form" onSubmit={registerNewUser}>
        <input
          placeholder="firstname"
          onChange={(event) => setInputFirst(event.target.value)}
        />
        <input
          placeholder="lastname"
          onChange={(event) => setInputLast(event.target.value)}
        />
        <input
          placeholder="email"
          onChange={(event) => setInputEmail(event.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(event) => setInputPassword(event.target.value)}
        />
        <button>Register</button>
      </form>
    </>
  );
};

export default NewUserRegistration;