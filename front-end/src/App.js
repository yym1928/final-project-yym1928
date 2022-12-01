import React, { useState } from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StickyNavbar from "./pages/components/StickyNavbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('user'));

  return (
    <>
      <BrowserRouter>
        <StickyNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<Edit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
