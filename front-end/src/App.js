import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";

function App() {
  console.log("hello");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
