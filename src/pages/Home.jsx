import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/all-posts?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="home">
      <h1>Welcome to TravelBugs!</h1>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search travel posts..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="featured-section">
        <h2>Featured Posts</h2>
        {/* Placeholder for featured posts */}
        <div className="featured-posts">
          <div className="post-card">
            <h3>Explore Bali</h3>
            <img
              src="https://example.com/bali.jpg"
              alt="Explore Bali"
              className="post-image"
            />
          </div>
          <div className="post-card">
            <h3>Discover Paris</h3>
            <img
              src="https://example.com/paris.jpg"
              alt="Discover Paris"
              className="post-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
