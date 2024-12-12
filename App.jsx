
import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from './components/Homepage';
import Navbar from './components/NavBar';
import Account from './components/Account';
import AccountDetails from './components/AccountDetails';
import CreatePost from './components/CreatePost';
import MyProfile from './components/MyProfile';



const App = () => {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
       </>
  );
};

export default App;

/*
<Route path="/postcatalogue" element={<AllPosts />} />
        <Route path="/postcatalogue/:id" element={<PostDetails />} />

        import AllPosts from './components/AllPosts';
import PostDetails from './components/PostDetails';
      */

