import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar.js";
import FindFood from "./FindFood.js";
import About from "./About.js";
import Contact from "./Contact.js";
import MoreResources from "./MoreResources.js";

function App() {
  return (
    <>
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
      <Routes>
        <Route exact path="/" element={<FindFood />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<MoreResources />} />
      </Routes>
      <div id="bottom-gradient">
        <div className="tanglow" />
        <div className="mango-tango" />
        <div className="piper" />
      </div>
    </>

  );
}

export default App;