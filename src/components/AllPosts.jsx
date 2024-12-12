//AllMovies = AllPosts. Change to Feed after. 
//AllMovies is AllPosts (Feed)
//Replace movies with posts: const AllPosts, posts, setPosts, getPosts, postData, post.title, const sortedPosts, etc.

/*


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("/post");    //need to replace this with the correct backend and ensure that's running.
        const postData = await response.json();
        setPosts(postData);
      } catch (e) {
        console.error("Error fetching posts:", e);
      }
    };
    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>Your Travel Posts</h1>
      <input
        type="text"
        placeholder="Search for post"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <section id="all-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.postId} onClick={() => navigate(`/postcatalog/${post.postId}`)}>
              <h3>{post.title}</h3>
              {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} height="350" width="250" />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </section>
    </>
  );
};

export default AllPosts;








/*
//CHANGE MOVIES TO POSTS! MOVIE TO POST! IS THIS LIKE FEED OR PROFILE??
/*

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AllPosts = () => {
  const [movies, setMovies] = useState([]);
  const [chronologicalMovies, setChronologicalMovies] = useState([]);
  const [releaseDateMovies, setReleaseDateMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://travel-bugs2.onrender.com/movies");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();
        setMovies(data);

        const chronological = [...data].sort((a, b) => a.chronologicalOrder - b.chronologicalOrder);
        const releaseDate = [...data].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        setChronologicalMovies(chronological);
        setReleaseDateMovies(releaseDate);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>Chronological Order</h2>
        <ul>
          {chronologicalMovies.map((movie) => (
            <li key={movie.id}
            onClick={() => navigate(`/moviecatalog/${movie.id}`)}>
              <strong>{movie.title}</strong> - Order: {movie.chronologicalOrder}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Release Date Order</h2>
        <ul>
          {releaseDateMovies.map((movie) => (
            <li key={movie.id}
            onClick={() => navigate(`/moviecatalog/${movie.id}`)}>
              <strong>{movie.title}</strong> - Release Date: {new Date(movie.releaseDate).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPosts;

*/











