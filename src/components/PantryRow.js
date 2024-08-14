import React from "react";

function PantryRow() {
  return(
    <div className="pantry-row">
      <div className="pantry-card">
        <p>Food Pantry Name</p>
        <p>Address</p>
        <p>Phone Number</p>
        <p>Website</p>
      </div>
      <div className="hours monday"> 9am - 5pm</div>
      <div className="hours tuesday"> 9am - 5pm</div>
      <div className="hours wednesday"> 9am - 5pm</div>
      <div className="hours thursday"> 9am - 5pm</div>
      <div className="hours friday"> 9am - 5pm</div>
      <div className="hours saturday"> 9am - 5pm</div>
      <div className="hours sunday"> 9am - 5pm</div>
    </div>
  )

}

export default PantryRow;