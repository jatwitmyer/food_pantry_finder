import React, { useState, useEffect } from "react";
import PantryRow from "./PantryRow.js";
// import LoadingAnimation from "./LoadingAnimation.js";

function FindFood() {
  const [pantries, setPantries] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 27.964157, lng: -82.452606 });
  const [pantryRows, setPantryRows] = useState([]);

// Update State Upon Search ////////////////////////////////////
  useEffect(() => { // Fetch pantries when coordinates change
    async function fetchPantries() {
      try {
        const places = await searchPlaces(coordinates);
        setPantries(places.map((place) => place.Eg))
        setPantryRows(pantries.map((pantry) => <PantryRow key={pantry.id} pantryDetails={pantry} />));
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
    fetchPantries();
  }, [coordinates]);

  async function changeCoordinates(e) { // Update coordinates when promise resolves
    e.preventDefault();
    const address = e.target.address.value;
    try {
      const newCoordinates = await codeAddress(address);
      setCoordinates(newCoordinates);
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  }
/////////////////////////////////////////////////////////

// Initialize and add the map ///////////////////////////
  let geocoder;
  let map;

  async function initMap() {
    // The location of tampa
    const tampa = { lat: 27.964157 , lng: -82.452606 };
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at tampa
    map = new Map(document.getElementById("map"), {
      zoom: 12,
      center: coordinates,
      mapId: "DEMO_MAP_ID",
    });

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
  }
/////////////////////////////////////////////////

// Google Maps API functions /////////////////////
  async function codeAddress(address) { // Query google geocoder api for coordinates of address
    return new Promise((resolve, reject) => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve({ lat, lng });
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  async function searchPlaces(coordinates) { // Query google places api for food pantries
    return new Promise(async (resolve, reject) => {
      try {
        // const location = map.getCenter();
        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary("places");
        const request = {
          fields: ['displayName', 'location', 'formattedAddress'],
          locationBias: coordinates,
          textQuery: 'food pantry',
          rankPreference: SearchNearbyRankPreference.DISTANCE,
        };
        const { places } = await Place.searchByText(request);
        resolve(places);
      }
      catch (error) {
        console.error(error);
        reject(error);
      }
  })
  }
///////////////////////////////////////////////

  initMap();

  return(
  <div id="food-content">
    <form onSubmit={changeCoordinates} id="address-container" className="row-1">
      <h2>Address</h2>
      <div class="tooltip">
        <i class="material-icons">&#xe88f;</i>
        <span class="tooltip-text">You can search for local food pantries by inputing one of the following:
          <ul>
            <li>City, State (e.g. Wilmington, NC)</li>
            <li>Zip code (e.g. 14602)</li>
            <li>Nearby intersection (e.g. 3rd and Broadway)</li>
          </ul>
        </span>
      </div>
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
    <div id="map"></div>
    {/* <LoadingAnimation /> */}
  </div>
  )
}


export default FindFood;