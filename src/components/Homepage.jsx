

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import phase1 from "../../prisma/phase1";


const Home = () => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const navigate = useNavigate();


  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sortKey: Math.random() })) 
      .sort((a, b) => a.sortKey - b.sortKey)               
      .map(({ sortKey, ...item }) => item);               
  };
  
  useEffect(() => {
    const shuffled = shuffleArray([...phase1]); 
    setShuffledPosts(shuffled);                
  }, []);


const handlePostClick = () => {
  setMessage("Please login or register, and become a travelbug!");
  setTimeout(() => {
    navigate("/account");
  }, 3000); // 3-second delay
};

  return (
    <>

    <div className="all-posts-container">
      <>
      <img 
          src="/src/assets/TravelBugslogo.png"
           alt="Travel Bugs Logo" 
            className="homepage-logo"  />
        <h1> Discover the best vacation experiences...</h1>
        <input
          type="text"
          placeholder="Where To?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"/>
      </>


      {message && <p className="click-message">{message}</p>}


      <div className="post-container">
      {shuffledPosts
          .filter((post) =>
              post.title.toLowerCase().includes(search.toLowerCase())
            )
        .map((post) => (
          
          <div key={post.postId} className="post"
           onClick={handlePostClick} style={{ cursor: "pointer" }}>

            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <div className="post-meta">
                <span className="post-user">{post.user}</span>
                <span className="post-rating">Rating: {post.rating}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;









