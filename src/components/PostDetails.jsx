//MovieDetails = PostDetails. Original was Post.jsx. 

//Post.jsx displays a single post in the app. Each post includes user info, username, profile pic, descrip, img, and buttons for likes/comments. Users can like/unlike a post. LIkes count up. It fetches user data base on the post.userId to diplsay  the users details and mtianin the steate for likes.  // for post singular. post likes. users who like the post. hearts and like icons. 

/*
const PostDetails = () => {

    return(<h1>Post Deetz</h1>);
}

export default PostDetails;

/*

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { phase1  } from "../phases/phase1";     //travelerList is a proxy for Users supposed to be imported here!


const PostDetails ({ post }) {               //The post component accepts a post object as a prop, which tontains userId, desc, img, likes, createdAt
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


    /*const likeHandler = () => {             //NEED LIKE/COMMENTS ENABLES IN DB? Handle like button click. Updates the likes count frontend and backend.     // Update like state locally
        try {
        const response = fetch(`/posts/${post._id}/like`, {     //changed from await fetch to fetch     //DO I NEED THE ACTUAL API URL??
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
        */


        
    /* 
    
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
    )
}

export default PostDetails 

*/





/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { useWatchlist } from './WatchlistContext';
//import CommentsSection from './CommentsSection';

const PostDetails = () => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const { addToWatchlist } = useWatchlist();
  //const [userRating, setUserRating] = useState(0);
  //const [averageRating, setAverageRating] = useState(0);

  const token = localStorage.getItem('token')

  useEffect(() => {
    const getSingleMovie = async () => {
      try {
        const response = await fetch(`https://codevengers-backend.onrender.com/movies/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSelectedMovie(data);
      } catch (error) {
        console.error("Error fetching single movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleMovie();
  }, [id]);

  const fetchRatingData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch(`https://codevengers-backend.onrender.com/ratings/movies/${id}/ratings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Rating data:", data);

        if (data.average !== undefined && data.userRating !== undefined) {
          setAverageRating(data.average);
          setUserRating(data.userRating);
        } else {
          console.error("Invalid rating data format.");
        }
      } else {
        console.error("Failed to fetch ratings.");
      }
    } catch (error) {
      console.error("Error fetching rating data", error);
    }
  };

  const handleRatingClick = async (rating) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://codevengers-backend.onrender.com/ratings/movies/${id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (response.ok) {
        fetchRatingData();
        setUserRating(rating);
      } else {
        console.error("Failed to save user rating.");
      }
    } catch (error) {
      console.error("Error saving rating", error);
    }
  };

  useEffect(() => {
    fetchRatingData();
  }, [id]);

  const handleAddToWatchlist = () => {
    addToWatchlist(selectedMovie);
  };

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://codevengers-backend.onrender.com/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        console.log(`Comment with ID ${commentId} deleted.`);
        setSelectedMovie((prevMovie) => ({
          ...prevMovie,
          comments: prevMovie.comments.filter((comment) => comment.id !== commentId),
        }));
      } else {
        console.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://codevengers-backend.onrender.com/comments/replies/${replyId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        console.log(`Reply with ID ${replyId} deleted.`);
      } else {
        console.error("Failed to delete reply.");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };
  
  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (!selectedMovie) {
    return <p>Movie details not found.</p>;
  }

  return (
    <>
      {selectedMovie.image && (
        <img
          id="movie-poster"
          src={selectedMovie.image}
          alt={`Poster for ${selectedMovie.title}`}
          height="500"
          width="350"
        />
      )}
      <h2 id="movie-title">{selectedMovie.title}</h2>
      <p id="movie-summary">{selectedMovie.summary}</p>
      <CommentsSection movieId={id} />
      
      {token && ( 
      <button onClick={handleAddToWatchlist}>Add to Watchlist</button> )}

      <div>
        <h3>Rate This Movie</h3>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: userRating >= star ? "gold" : "gray",
                fontSize: "24px",
              }}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <p>Current Average Rating: {averageRating.toFixed(1)}</p>
      </div>
    </>
  );
};

export default PostDetails;

*/
