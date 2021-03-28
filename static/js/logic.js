// Create the tile layer that will be the background of our map
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "outdoors-v11",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  Earthquakes: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [35.00, -150.00],
  zoom: 3.2,
  layers: layers.Earthquakes

});

// Add our 'outdoors' tile layer to the map
outdoors.addTo(map);

//=========================== adding map content below ==============================//

// Create an overlays object to add to the layer control
var overlays = {
  "Earthquakes": layers.Earthquakes
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright",
  
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

//============================== Load the USGS geoJSON data ===========================//

// Perform an API call to the USGS Earthquake Information endpoint
var usgsURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a list to hold the latlng information from the USGS geoJSON data
var earthQuakeEvents = []

// Set the markerStyle, color and radius information based on data
d3.json(usgsURL, (earthQuakeEvents) => {
    function markerStyle(feature) {
      return {
        opacity: 1,
        fillOpacity: 0.3,
        fillColor: mapColor(feature.properties.mag),
        color: "#000000",
        radius: mapRadius(feature.properties.mag),
        stroke: true,
        weight: 0.25
      };
    }
    function mapColor(mag) {
      switch (true) {
        case mag > 5:
          return "#f54242";
        case mag > 4.5:
          return "#ff6c0a";
        case mag > 3.5:
          return "#ff0000";
        case mag > 1.5:
          return "#83299e";
        default:
          return "#4e636b";
      }
    }

    function mapRadius(mag) {
      if (mag === 0) {
        return 1;
      }
      return mag * 3;
    }
    // Adding the markers to the map based on latlng with attributes from above.
    L.geoJson(earthQuakeEvents, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng),

      style: markerStyle,

      onEachFeature: function (feature, layer) {
        layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location: " + feature.properties.place);

      }
    }).addTo(map);
    
    // include a legend to provide information about colors indicated
    var legend = L.control({
      position: "bottomleft"
      
    });

    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "legend");

      var magnitudes = [0, 1.5, 3.5, 4.5, 5];
      var colors = ["#4e636b", "#83299e", "#ff0000", "#ff6c0a", "#f54242"];

      for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
          "Magnitude <i style = '#fffff: " + colors[i] + "'></i>" +
          magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");

      }
      return div;
    };
    legend.addTo(map);
  });


