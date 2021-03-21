function createMap(earthQuakes) {

  // Create the tile layer that will be the background of our map
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Satellite": satellite
  };

  // Create an overlayMaps object to hold the earthQuakes layer
  var overlayMaps = {
    "All Earth Quakes": earthQuakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [35.00, -150.00],
    zoom: 3.2,
    layers: [satellite, earthQuakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "coordinates" property off of response.data
  // var locations = response.properties.place;

  // Initialize an array to hold earthQuake events
  var observations = [];

  // Loop through geometry array
  // for (var index = 0; index < locations.length; index++) {
  //   var activity = locations[index];

  //   // For each station, create a marker and bind a popup with the station's name
  //   var event = L.marker(geometry.coordinates[0],[1])
  //     .bindPopup("<h3>" + geometry.coordinates + "<h3><h3>ID: " + geometry.id + "</h3>");

  //   // Add the marker to the events array
  //   events.push(event);
  // }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(observations));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
