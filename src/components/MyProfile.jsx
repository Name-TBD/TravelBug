import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";

const MyProfile = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
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
    {
      postId: 3,
      title: "Exploring Kyoto's Temples",
      imageUrl: "https://boutiquejapan.com/wp-content/uploads/2014/01/Kinkakuji-Golden-Pavilion-Kyoto-Japan-1140.png",
      description: "The serene temples and cherry blossoms in Kyoto were breathtaking.",
      rating: 5,
      startDate: "2023-03-20",
      endDate: "2023-03-27"
    },
    {
      postId: 4,
      title: "Adventures in the Swiss Alps",
      imageUrl: "https://www.muchbetteradventures.com/magazine/content/images/2019/07/10083602/iStock-499263804.jpg",
      description: "Hiking through the Swiss Alps was a dream come true! Stunning landscapes everywhere.",
      rating: 4.5,
      startDate: "2023-06-10",
      endDate: "2023-06-18"
    },
    {
      postId: 5,
      title: "Safari in Kenya",
      imageUrl: "https://i0.wp.com/imaraafricasafaris.com/wp-content/uploads/2020/11/image-147.png?resize=1000%2C565&ssl=1",
      description: "Witnessed elephants, lions, and zebras up close during a thrilling safari adventure.",
      rating: 5,
      startDate: "2023-08-05",
      endDate: "2023-08-12"
    },
    {
      postId: 6,
      title: "Beach Getaway in the Maldives",
      imageUrl: "https://cdn1.matadornetwork.com/blogs/1/2022/02/Maldives-beach-Coco-Bodu-Hithi-Resort.jpg",
      description: "Relaxed on white sandy beaches and stayed in beautiful overwater bungalows.",
      rating: 4.8,
      startDate: "2023-02-14",
      endDate: "2023-02-21"
    },
  
    
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, postId: posts.length + 1 }]);
  };

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-change", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-change", syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setProfileMessage(location.state.message);
    }
  }, [location.state]);

  return (
    <div className="account-details">
      {profileMessage && <p className="status-message">{profileMessage}</p>}
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
      {isLoggedIn ? (
        <>
          <div className="post-container">
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
                  From: {new Date(post.startDate).toLocaleDateString()} To:{" "}
                  {new Date(post.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <h3>Create a New Post</h3>
          <CreatePost onPostCreated={addPost} />
        </>
      ) : (
        <p>
          Please <Link to="/account">log in</Link> to view your posts.
        </p>
      )}
    </div>
  );
};

export default MyProfile;
