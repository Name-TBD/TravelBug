

import { useState } from "react";
import phase1 from "../../prisma/phase1";
import phase2 from "../../prisma/phase2";

const Home = () => {
  const [search, setSearch] = useState("");
  const allPosts = [...phase1, ...phase2];

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

    <div className="all-posts-container">
      
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
        className="search-bar"
      />
      <div className="post-container">
        {filteredPosts.map((post) => (
          <div key={post.postId} className="post">
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









