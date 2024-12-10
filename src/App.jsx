
import { Routes, Route } from "react-router-dom"
import './App.css';

import Home from './pages/Home';
import NavBar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';



const App = () => {

  return (
    <>
      <NavBar />
      <h1>TravelBugs</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
       </>
  );
};

export default App;
    
    
