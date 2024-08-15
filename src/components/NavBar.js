import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return(
    <div id="nav-buttons">
      <NavLink id="find-food" to="/">Find Food</NavLink>
      <NavLink id="about" to="/about">About</NavLink>
      <NavLink id="contact" to="/contact">Contact</NavLink>
      <NavLink id="more-resources" to="/resources">More Resources</NavLink>
    </div>
  )
}

export default NavBar;