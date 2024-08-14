import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar.js";
import FindFood from "./FindFood.js";
import About from "./About.js";
import Contact from "./Contact.js";
import MoreResources from "./MoreResources.js";

function App() {
  return (
    <div id="root">
      <div id="nav-bar" className="sycamore">
        <h1 id="title">Food Pantry Finder</h1>
        <NavBar />
      </div>
      <div id="top-gradient">
        <div className="sycamore-dark" />
        <div className="piper" />
        <div className="mango-tango" />
        <div className="tanglow" />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<FindFood />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<MoreResources />} />
        </Routes>
      </div>
      <div id="bottom-gradient" className="row-5">
        <div className="tanglow" />
        <div className="mango-tango" />
        <div className="piper" />
      </div>
    </div>

  );
}

export default App;