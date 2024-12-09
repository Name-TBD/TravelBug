//Posts functionality includes users interacting with posts to make comments, likes, etc. 

import React, {useState, useEffect} from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts');
        if(!response.ok) {
          throw new Error('Failed to fetch posts');
        } 
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      }catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  },[]);

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>{error}</div>;

  return (
    <div className="posts-container">
      <h2>Travel Experieces</h2>
      {posts.map((post) => (
        <div key= {post.postId} className="post-card">
          <h3>{post.title}</h3>
          {post.imageUrl && (
            <img
              src ={post.imageUrl}
              alt = {post.title}
              className="post-image"
              />
          )}
          <p>{post.description}</p>
          <div className="post-details">
            <span> Trip Dates: {new Date(post.startDate).toLocaleDateString()} - {new Date(post.endDate).toLocaleDateString()}</span>
            <span>Rating: {post.rating}/5</span>
            <span>Posted by : {post.user.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;