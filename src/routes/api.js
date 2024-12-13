const APIURL = 'https://travelbug-2.onrender.com'; // Ensure the API URL is consistent

export const registerUser = async (userData) => {
  const response = await fetch(`${APIURL}/auth/register`, { // Fixed endpoint path
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${APIURL}/auth/login`, { // Fixed endpoint path
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};

export const getUserDetails = async (token) => {
  const response = await fetch(`${APIURL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};