import React, { useState, useEffect } from "react";
import PantryRow from "./PantryRow.js";
import LoadingAnimation from "./LoadingAnimation.js";
// import scrape from "scrape.js";

function FindFood() {
  const savedCoordinates = JSON.parse(localStorage.getItem('coordinates'));
  console.log(savedCoordinates);
  const savedPantries = JSON.parse(localStorage.getItem('pantries'));
  console.log(savedPantries);

  async function handleSearch(e) {
    e.preventDefault();
    console.log("Submit button clicked");
    const address = e.target.address.value;
    // const coordinates = { lat: 27.964157, lng: -82.452606 }; // Tampa coordinates for testing purposes
    const coordinates = await codeAddress(address);
    // console.log(coordinates)
    const pantries = await searchPlaces(coordinates);
    // console.log(pantries);

    localStorage.setItem('coordinates', JSON.stringify(coordinates));
    localStorage.setItem('pantries', JSON.stringify(pantries));
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



  async function codeAddress(address) {
    return new Promise((resolve, reject) => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          // console.log({ lat, lng })
          // const pantries = searchPlaces()
          resolve({ lat, lng });
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  async function searchPlaces(coordinates) {
    return new Promise(async (resolve, reject) => {
      try {
        const location = map.getCenter();
        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary("places");
        const request = {
          fields: ['displayName', 'location', 'formattedAddress'],
          locationBias: coordinates,
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
          resolve(places); // Resolve the promise with the list of places
        } else {
          console.log("No results");
          resolve([]); // Resolve with an empty array if no results
        }
      } catch (error) {
        console.error(error);
        reject(error); // Reject the promise if an error occurs
      }
    });
  }


  async function postToPlaces() {
    placesLibraryNew = "https://places.googleapis.com/v1/places:searchText"
    try {
      const response = await fetch(placesLibraryNew, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': 'places.displayName, places.location, places.formattedAddress',
          'X-Goog-Api-Key': 'AIzaSyAXSVExEObLD9tlzRg46QMc-6iZRTJjn6w',
        },
        body: JSON.stringify({
          textQuery: 'food pantry',
          rankPreference: 'DISTANCE',
          locationRestriction: {
            circle: {
              center: {
                latitude: 27.964157,
                longitude: -82.452606
              },
              radius: 40233.6 // 25 miles in meters
            }
          },
        }),
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error)
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