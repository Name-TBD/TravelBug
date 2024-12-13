//Post.jsx displays a single post in the app. Each post includes user info, username, profile pic, descrip, img, and buttons for likes/comments. Users can like/unlike a post. LIkes count up. It fetches user data base on the post.userId to diplsay  the users details and mtianin the steate for likes.  // for post singular. post likes. users who like the post. hearts and like icons. 

import { useEffect, useState } from 'react';
import styles from "../styles/post.module.css";
import { Link } from "react-router-dom"
import { travelerList  } from "../data.js";     //travelerList is a proxy for Users supposed to be imported here!


export default function Post ({ post }) {               //The post component accepts a post object as a prop, which tontains userId, desc, img, likes, createdAt
    const [like, setLike] = useState(post.likes.length);        
    const [isLiked, setIsLike] = useState(false);
    const [user, setUser] = useState({});


    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))         //Check if liked. useState initliaizes post.likes 
    }, [currentUser._id, post.likes]);


    useEffect(() => {               // Fetch user information based on `post.userId`
        const fetchUser = async () => {
        try {
            const response = await fetch(`/users/${post.userId}`);
            if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            } else {
            console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };

        fetchUser();
    }, [post.userId]);


    const likeHandler = async () => {             //NEED LIKE/COMMENTS ENABLES IN DB? Handle like button click. Updates the likes count frontend and backend.     // Update like state locally
        try {
        const response = await fetch(`/posts/${post._id}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUserId }),
            });
    
            if (response.ok) {


            setLike(isLiked ? like - 1 : like + 1)
            setIsLike(!isLiked)

            } else {
                console.error("Failed to update like");
            }
            } catch (error) {
            console.error("Error updating like:", error);
            }
        };

    return (                    //Post is renderd with users profile pic, username, post desc, img, liking button, comment/like count
        <div>
            <div className={styles.post} >
                <div className={styles.postWrapper}>
                    <div className={styles.postTop}>
                        <div className={styles.postTopLeft}>
                            <Link to={`profile/${user.username}`}>
                                <img className={styles.postProfileImg} src={user.profilePicture ? + user.profilePicture : + "blank-profile-picture.png"} alt="" />
                            </Link>
                            <span className={styles.postUsername}>
                                {user.username}
                            </span>
                            <span className={styles.postDate}>
                                {post.createdAt}
                            </span>
                        </div>
                        <div className={styles.postTopRight}>
                        </div>
                    </div>
                    <div className={styles.postCenter}>
                        <span className={styles.postText}>
                            {post?.desc}
                        </span>
                        <img className={styles.postImage} src={post.img} alt="" />

                    </div>
                    <div className={styles.postBottom}>
                        <div className={styles.postBottomLeft}>
                            <img className={styles.likeIcon} src={likeIcon} onClick={likeHandler} alt="" />
                            <img className={styles.likeIcon} src={heartIcon} onClick={likeHandler} alt="" />
                            <span className={styles.postLikeCounter}>
                                {like} people like it
                            </span>
                        </div>
                        <div className={styles.PostBottomRight}>
                            <span className={styles.postCommentText}>
                                {post.comment} comments
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};