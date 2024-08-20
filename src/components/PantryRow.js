import React from "react";

function PantryRow({pantryDetails}) {
  console.log(pantryDetails.hours)
  return(
    <div className="pantry-row">
      <div className="pantry-card">
        <p className="pantry-name">{pantryDetails.name}</p>
        <p className="pantry-address">{pantryDetails.address}</p>
        <p className="pantry-phone">{pantryDetails.phone}</p>
        <p className="pantry-rating">{pantryDetails.rating}</p>
        <a className="pantry-website" href={pantryDetails.website}>{pantryDetails.website}</a>
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