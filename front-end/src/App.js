import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StickyNavbar from "./pages/components/StickyNavbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <StickyNavbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
