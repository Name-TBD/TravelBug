export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${APIURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${APIURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${APIURL}/posts?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const addComment = async (postId, commentData, token) => {
  try {
    const response = await fetch(`${APIURL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error('Failed to add comment.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};