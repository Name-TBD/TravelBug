//Feed renders all posts for viewing. REfactored file from Posts.jsx for fetching posts into a feed. No liking or comments or posting. Posts functionality includes users interacting with posts to make comments, likes, etc. 


import React from "react";
import {useState, useEffect} from "react";
import CreatePost from "./CreatePost.jsx";
import Post from "./Post.jsx";
import { travelerList } from "../data.js";      //travelerList is a proxy for Posts that are to be imported here 

//export default function Feed({ username }) {  ???
const Feed = () => {    //"Posts.jsx" --> "Feed.jsx"
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

  return (    //REFACTOR. How does this rendering of posts cohere with createpost? Does this render a single post or a group of posts?
    
    
    //FROM FEED.JSX TO EMBED SHARE/CREATE POST AND POST WHICH WE DONT HAVE...
    <div className={styles.feed}>
    <div className={styles.feedWrapper}>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
            <Post key={p._id} post={p} />
        )
        )
        }
    </div>
</div>
);
}
    
  
    
    //from original posts.jsx file henry wrote before it became feed.jsx. pOSTS CONTAINER AND TRAVEL EXPERIENCES REFER TO SEVERAL POSTS, NOT ONE POST. THAT IS POST.JSX FILE!
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


export default Feed;

