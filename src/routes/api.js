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

// Add functionality for fetching comments and likes
export const addComment = async (postId, commentData, token) => {
  const response = await fetch(`${APIURL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });
  return await response.json();
};

export const getComments = async (postId) => {
  const response = await fetch(`${APIURL}/posts/${postId}/comments`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

export const likePost = async (postId, token) => {
  const response = await fetch(`${APIURL}/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const unlikePost = async (postId, token) => {
  await fetch(`${APIURL}/posts/${postId}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLikes = async (postId) => {
  const response = await fetch(`${APIURL}/posts/${postId}/likes`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};
