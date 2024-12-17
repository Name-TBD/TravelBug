import React, { useState } from "react";
import CreatePost from "./CreatePost";

const MyProfile = () => {
  const [user] = useState({
    userId: 1,
    username: "henry",
    email: "henry@example.com",
    firstName: "Henry",
    lastName: "Huynh",
  });

  const [posts, setPosts] = useState([
    {
      postId: 1,
      title: "My Trip to Paris",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
      description: "Had an amazing time visiting the Eiffel Tower!",
      rating: 5,
      startDate: "2023-05-01",
      endDate: "2023-05-07",
    },
    {
      postId: 2,
      title: "Beach Vacation in Bali",
      imageUrl: "https://www.brides.com/thmb/eOtyD6ZZ5-T2Ocn_e5ttHN0GWAQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/recirc-2232f9ff7cb4487d8a3446c5ff41bbfc.jpg",
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