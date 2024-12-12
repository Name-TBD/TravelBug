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
    const [isLoggedIn, setIsLoggedIn] = useState(true); //change this back to false!

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.registerName,
                    email: formData.registerEmail,
                    username: formData.registerUsername,
                    password: formData.registerPassword
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
        try {
            const response = await fetch('/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.inputUsername,
                    password: formData.inputPassword
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
            {isLoggedIn ? (
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














/*
import React, { useEffect, useState } from "react";
import AccountDetails from "./AccountDetails"

const Account = () => {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('')

    const [token, setToken] = useState({})

    const [tokenPresent, setTokenPresent] = useState(false);

    const register = async (event) => {

        event.preventDefault();

        try {
            const response = await fetch('https://travel-bugs2.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({    //CHECK OUR STRING VARIABLES: E.G. REGISTERnAME??
                    name: registerName,
                    email: registerEmail,
                    username: registerUsername,
                    password: registerPassword

                }),
            });

            setRegisterName('');
            setRegisterEmail('');
            setRegisterUsername('');
            setRegisterPassword('');

            const tokenObj = await response.json();
            if (response.ok) {

                const accessToken = tokenObj.token;
                setToken(accessToken);
                localStorage.setItem('token', accessToken)


            } else {
                console.error('Registration failed', tokenObj);
            }
        } catch (error) {
            console.error('Error during registration, Sorry!', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setTokenPresent(!!token);
    }, [])

    const login = async (event) => {
        event.preventDefault();
      
        try {
            const userResponse = await fetch('https://travel-bugs2.onrender.com/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputUsername,    //CHeck ours login strings: e.g. inputUsername?
                    password: inputPassword
                })
            });
    
            localStorage.setItem('username', inputUsername);
            setInputUsername('');
            setInputPassword('');
      
            const object = await userResponse.json();
    
            if (userResponse.ok) {
                const accessToken = object.token;
                setToken(accessToken);
                localStorage.setItem('token', accessToken); 
                setTokenPresent(true);
            } else {
                console.error('Login failed:', object);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logOut = () => {
        localStorage.removeItem('token')
        setTokenPresent(false);
    }


    
    return (
      <div className="account">
        {tokenPresent ? (
            <>
                <AccountDetails />
                <button onClick={logOut}>Logout</button>
            </>
        ) : (
            <>
                <form onSubmit={register}>
                    <h1>New User Registration</h1>
                    <input type="text" name="name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="First Name" required />
                    <input type="email" name="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email" required />
                    <input name="username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" name="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <input name="username" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" name="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Log In</button>
                </form>
            </>
        )}
    </div>
);
};
export default Account;

*/



/*
import React from "react";
import { useEffect, useState } from "react";  

const Account = () => {
  const [userDetails, setUserDetails] = useState('')


  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const details = await getUserDetails(token);  //Need i import getUserDetails above?
        setUserDetails(details);
      } catch (err) {
        console.error("Error", err)
      }
    };
    fetchUserDetails();
  }, []);



return (  
  <div className="page-container">    
    <div className="account-container">

      <h2>Account Info</h2>   
      {userDetails ? ( 
        <div>
          <p>First Name: {userDetails.firstname}</p>
          <p>Last Name: {userDetails.lastname}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )};
    </div>
  </div>
);
};

export default Account


*/