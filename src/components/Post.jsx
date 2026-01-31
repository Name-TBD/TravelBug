import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/post.module.css";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes("currentUserId"));
  }, [post.likes]);

  useEffect(() => {
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

  const likeHandler = async () => {
    try {
      const response = await fetch(`/posts/${post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "currentUserId" }),
      });

      if (response.ok) {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link to={`profile/${user.username}`}>
              <img
                className={styles.postProfileImg}
                src={
                  user.profilePicture || "default-profile-picture.png"
                }
                alt=""
              />
            </Link>
            <span className={styles.postUsername}>{user.username}</span>
            <span className={styles.postDate}>{post.createdAt}</span>
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>{post?.desc}</span>
          <img className={styles.postImage} src={post.img} alt="" />
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            <img
              className={styles.likeIcon}
              src="likeIcon.png"
              onClick={likeHandler}
              alt=""
            />
            <span className={styles.postLikeCounter}>{like} people like it</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    desc: PropTypes.string,
    img: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};
