import React, { useState } from "react";
import CreatePost from "./CreatePost";

const MyProfile = () => {
  const [user] = useState({
    userId: 1,
    username: "johndoe",
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
  });

  const [posts, setPosts] = useState([
    {
      postId: 1,
      title: "My Trip to Paris",
      imageUrl: "https://example.com/paris.jpg",
      description: "Had an amazing time visiting the Eiffel Tower!",
      rating: 5,
      startDate: "2023-05-01",
      endDate: "2023-05-07",
    },
    {
      postId: 2,
      title: "Beach Vacation in Bali",
      imageUrl: "https://example.com/bali.jpg",
      description: "Relaxing on the beautiful beaches of Bali.",
      rating: 4,
      startDate: "2023-07-15",
      endDate: "2023-07-22",
    },
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, postId: posts.length + 1 }]);
  };

  return (
    <div className="account-details">
      <h2>Welcome, {user.username}!</h2>
      <div className="user-info">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
      </div>

      <h3>Your Posts</h3>
      <div className="user-posts">
        {posts.map((post) => (
          <div key={post.postId} className="post">
            <h4>{post.title}</h4>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="post-image"
            />
            <p>{post.description}</p>
            <p>Rating: {post.rating}/5</p>
            <p>
              From: {new Date(post.startDate).toLocaleDateString()} To: {" "}
              {new Date(post.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <h3>Create a New Post</h3>
      <CreatePost onPostCreated={addPost} />
    </div>
  );
};

export default MyProfile;