import React, { useState, useEffect } from "react";
import PantryRow from "./PantryRow.js";
import LoadingAnimation from "./LoadingAnimation.js";
// import scrape from "scrape.js";

function FindFood() {
  // useEffect(() => {
  //   console.log("Component mounted");
  // }, []);

  //conditionally add padding to the sunday column when height of children exceeds 163px
  // const sunday = document.getElementById("sunday-column");
  // const pantryData = document.getElementById("pantry-data");
  // if (pantryData.clientHeight > 163) {
  //   // sunday.style.outline = "red 1px solid";
  //   sunday.style.paddingRight = "40px";
  // }


  async function handleSearch(e) {
    e.preventDefault();
    // setUrls([])
    // setAllPantries([])
    console.log("Submit button clicked");
    const address = e.target.address.value;
    codeAddress(address);
    
  }


  // Initialize and add the map
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
      center: tampa,
      mapId: "DEMO_MAP_ID",
    });
    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();

    // The marker, positioned at tampa
    // const marker = new google.maps.Marker({
    //   map: map,
    //   position: tampa,
    //   title: "T",
    //   // label: "Tampa",
    //   optimized: false
    // });
    // marker.addListener("click", () => {
    //   infoWindow.close();
    //   infoWindow.setContent(marker.getTitle());
    //   infoWindow.open(marker.getMap(), marker);
    // });
  }



  function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        // const data = results.type()
        console.log(results[0])
        const formattedAddress = results[0].formatted_address;
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        const pantries = searchPlaces()
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  async function searchPlaces() {
    const location = map.getCenter();
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
      "places",
    );
    const request = {
      fields: ['attributions', 'id', 'displayName', 'accessibilityOptions', 'types', 'addressComponents', 'formattedAddress', 'businessStatus', 'location', 'nationalPhoneNumber', 'rating', 'userRatingCount', 'websiteURI', 'regularOpeningHours', 'utcOffsetMinutes'],
      locationBias: {
        lat: location.lat(),
        lng: location.lng()
      },
      textQuery: 'food pantry',
      rankPreference: SearchNearbyRankPreference.DISTANCE,
    };
    const { places } = await Place.searchByText(request);
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    if (places.length) {
      console.log(places);
  
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds();
  
      // Loop through and get all the results.
      places.forEach((place) => {
        const markerView = new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
        });
  
        bounds.extend(place.location);
        console.log(place);
      });
      map.fitBounds(bounds);
    } else {
      console.log("No results");
    }
  }

  initMap();

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
          {/* {pantryRows} */}
        </div>
      </div>
    </div>
    <div id="map"></div>
    {/* <LoadingAnimation /> */}
  </div>
  )
}

export default FindFood;