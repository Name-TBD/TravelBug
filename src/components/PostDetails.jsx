import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://travelbug-2.onrender.com/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (!post) {
    return <div>Error loading post details.</div>;
  }

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} className="post-image" />
      <p>{post.description}</p>
      <p>
        Rating: {post.rating}/5 | From: {post.startDate} To: {post.endDate}
      </p>
      <div>
        <h3>Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
