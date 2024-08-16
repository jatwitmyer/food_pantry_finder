import React from "react";
import PantryRow from "./PantryRow.js";
import LoadingAnimation from "./LoadingAnimation.js";
// import scrape from "scrape.js";

function FindFood() {

  async function handleSearch(e) {
    e.preventDefault();
    console.log("Submit button clicked");
    const address = e.target.address.value;
    // scrape(address)
    try {
      const response = await fetch('http://localhost:8000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Number of pantries:', data.numPantries);
      } else {
        console.error('Error occurred during scraping');
      }
    } catch (error) {
      console.error('Error occurred during scraping', error);
    }
  }



  return(
  <div id="food-content">
    <form onSubmit={handleSearch} id="address-container" className="row-1">
      <h2>Address</h2>
      {/* <label for="address">Address</label> */}
      <input
        type="text"
        id="address"
        placeholder="Enter your full or partial address"
      />
      <input type="submit" id="search" defaultValue="Search" />
    </form>
    <div className="row-2 sub-header">
      <h3 id="sub-title">Search Results</h3>
      <div id="export-buttons">
        <button id="download">Download</button>
        <button id="print">Print</button>
        <button id="share">Share</button>
        <button id="edit">Edit</button>
      </div>
      <div id="filters-bar">
        {/* Javascript addition here: Showing results x of y */}
        {/* <button id="filters">Filters </button> */}
        <label htmlFor="distance">Distance</label>
        <select id="distance" name="distance">
          <option value={5}>5 miles</option>
          <option value={10}>10 miles</option>
          <option value={15}>15 miles</option>
          <option value={20}>20 miles</option>
          <option value={25}>25 miles</option>
        </select>
        {/* add filters icon here */}
      </div>
    </div>
    <div id="pantry-content" className="row-3">
      <div id="chart-container">
        <table>
          <tbody>
            <tr>
              <th style={{ width: "30%" }} className="card">
                Pantries
              </th>
              <th style={{ width: "10%" }} className="monday">
                Mon
              </th>
              <th style={{ width: "10%" }} className="tuesday">
                Tue
              </th>
              <th style={{ width: "10%" }} className="wednesday">
                Wed
              </th>
              <th style={{ width: "10%" }} className="thursday">
                Thur
              </th>
              <th style={{ width: "10%" }} className="friday">
                Fri
              </th>
              <th style={{ width: "10%" }} className="saturday">
                Sat
              </th>
              <th style={{ width: "10%" }} className="sunday">
                Sun
              </th>
            </tr>
          </tbody>
        </table>
        <div id="pantry-data">
          <PantryRow />
          <PantryRow />
          <PantryRow />
        </div>
      </div>
    </div>
    <LoadingAnimation />
  </div>
  )
}

export default FindFood;