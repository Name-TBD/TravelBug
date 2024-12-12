

import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

const AccountDetails = () => {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch ('https://travelbug-2.onrender.com/users/me');
               // const response = await fetch ('https://travelbug-2.onrender.com/users');
                /* const response = await fetch('/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }   */
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem("token");
               const reponse = await fetch ('https://travelbug-2.onrender.come/post');
               //const reponse = await fetch ('https://travelbug-2.onrender.come/post/1');
               /* const response = await fetch('/post', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }   */
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user posts");
                }
                const postsData = await response.json();
                setPosts(postsData.filter(post => post.userId === user.userId));
            } catch (err) {
                console.error("Error fetching user posts:", err);
            }
        };

        fetchUser();
        fetchUserPosts();
    }, [user.userId]);

    return (
        <div className="account-details">
            <h2>Welcome, {user.username}!</h2>
            <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
            </div>

            <h3>Your Posts</h3>
            <div className="user-posts">
                {posts.map(post => (
                    <div key={post.postId} className="post">
                        <h4>{post.title}</h4>
                        <img src={post.imageUrl} alt={post.title} className="post-image" />
                        <p>{post.description}</p>
                        <p>Rating: {post.rating}/5</p>
                        <p>From: {new Date(post.startDate).toLocaleDateString()} To: {new Date(post.endDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            <h3>Create a New Post</h3>
            <CreatePost />
        </div>
    );
};

export default AccountDetails;
