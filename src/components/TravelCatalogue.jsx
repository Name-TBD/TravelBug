/*TravelCatalogue TBD. 
//Need to feature a few posts and users on homepage pre-login.
//Or, import data.js for Users and Posts. Take the Render logic from POst.jsx for style.
//Delete this component and workd idrectly in the page, or import this component within. 



import { useEffect, useState } from "react"
import { Posts } from "../Data.js"; 
import { Users } from "../Data.js";

const travelCatalogue= () => {
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);



  return (
    <div className="book-list-container">
      <h1>Book Listings</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <a href={`/books/${book.id}`} className="book-link">
              <h2>{book.title}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelCatalogue;