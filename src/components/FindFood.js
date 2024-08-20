import React, { useState, useEffect } from "react";
import PantryRow from "./PantryRow.js";
import LoadingAnimation from "./LoadingAnimation.js";
// import scrape from "scrape.js";

function FindFood() {
  const [urls, setUrls] = useState(() => {
    const savedUrls = localStorage.getItem("urls");
    return savedUrls ? JSON.parse(savedUrls) : [];
  });
  console.log(urls.length)

  const [allPantries, setAllPantries] = useState(() => {
    const savedPantries = localStorage.getItem("allPantries");
    return savedPantries ? JSON.parse(savedPantries) : [];
  });

  const [pantryRows, setPantryRows] = useState([]);
  // console.log(allPantries)

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  useEffect(() => {
    const rows = allPantries.map((pantry, index) => (
      <PantryRow key={index} pantryDetails={pantry} />
    ));
    setPantryRows(rows);
  }, [allPantries]);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  useEffect(() => {
    localStorage.setItem("allPantries", JSON.stringify(allPantries));
  }, [allPantries]);

  //conditionally add padding to the sunday column when height of children exceeds 163px
  const sunday = document.getElementById("sunday-column");
  const pantryData = document.getElementById("pantry-data");
  if (pantryData.clientHeight > 163) {
    // sunday.style.outline = "red 1px solid";
    sunday.style.paddingRight = "40px";
  }


  async function handleSearch(e) {
    e.preventDefault();
    setUrls([])
    setAllPantries([])
    console.log("Submit button clicked");
    const address = e.target.address.value;
    requestPantryUrls(address);
  }

  async function requestPantryUrls(address) {
    try {
      const response = await fetch('http://localhost:8000/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        const urls = await response.json();
        // console.log(urls)
        setUrls(urls);
        localStorage.setItem("urls", JSON.stringify(urls));
        urls.forEach(url => requestPantryDetails(url));
      } else {
        console.error('Error occurred during scraping');
      }
    } catch (error) {
      console.error('Error occurred during scraping', error);
    }
  }


  async function requestPantryDetails(url) {
    try {
      const response = await fetch('http://localhost:8000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        const pantryDetails = await response.json();
        setAllPantries(prevPantries => [...prevPantries, pantryDetails]);
        // localStorage.setItem("allPantries", JSON.stringify(allPantries));
        // console.log(pantryDetails) //object with pantry details
      } else {
        console.error('Error occurred during scraping');
      }
    } catch (error) {
      console.error('Error occurred during scraping', error);
  }}

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
              <th style={{ width: "30%" }} >Pantries</th>
              <th style={{ width: "10%" }} >Mon</th>
              <th style={{ width: "10%" }} >Tue</th>
              <th style={{ width: "10%" }} >Wed</th>
              <th style={{ width: "10%" }} >Thur</th>
              <th style={{ width: "10%" }} >Fri</th>
              <th style={{ width: "10%" }} >Sat</th>
              <th style={{ width: "10%" }} id="sunday-column">Sun</th>
            </tr>
          </tbody>
        </table>
        <div id="pantry-data">
          {/* <PantryRow />*/}
          {pantryRows}
        </div>
      </div>
    </div>
    {/* <LoadingAnimation /> */}
  </div>
  )
}

export default FindFood;