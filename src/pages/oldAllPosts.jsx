
/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://travelbug-2.onrender.com/posts');
        if (!response.ok) {
          const errorText = await response.text(); // Inspect raw error response
          throw new Error('Failed to fetch posts.');
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="all-posts">
      <h1>All Travel Posts</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts"
        className="search-input"
      />
      <section className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.postId}
              className="post-card"
              onClick={() => navigate(`/post/${post.postId}`)}
            >
              <h3>{post.title}</h3>
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="post-image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </section>
    </div>
  );
};

export default AllPosts;

*/