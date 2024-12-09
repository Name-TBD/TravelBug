//Import landingpage components, and establish routes

import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import NavBar from "./pages/NavBar";
import Homepage from "./pages/Homepage";
import AccountDetails from "./pages/AccountDetails";
import './App.css'

const App = () => {
  
  return (
    <>
      <NavBar logOutButton={token ? <button id="logout-button" onClick={logOut}>Log Out</button> : null} />
      <h1>TravelBugs</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/accountdetails" element={<AccountDetails />} />  
      </Routes>
       </>
  )
}

export default App
    