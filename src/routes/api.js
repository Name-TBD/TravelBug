const APIURL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api';
'https://TravelBugs'

/*export const getBooks = async () => {
  const response = await fetch(`${APIURL}/books`);
  const booksJson = await response.json();
  return booksJson.books;
};

export const getBookDetails = async (bookId) => {
  const response = await fetch(`${APIURL}/books/${bookId}`);
  const idJson = await response.json();
  return idJson;
};
*/

export const registerUser = async (userData) => {
  const response = await fetch(`${APIURL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const registerJson = await response.json();
  return registerJson;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${APIURL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const loginJson = await response.json();
  return loginJson;
};

export const getUserDetails = async (token) => {
  const response = await fetch(`${APIURL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const detailsJson = await response.json();
  return detailsJson;
};

