// herehere is where we put the file that we need to use.
// Setting up the map layer using leaflet
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// Initialize all of the layer groups well be using for the project.
var layers = {
    PLACE: new L.LayerGroup(),
    MAGNITUDE: new L.LayerGroup(),
    TIME: new L.LayerGroup(),
    COORDINATES: L.LayerGroup()
};

// Creating the map and the layeres
var map = L.map("map-id", {
    center: [ 0, 0],
    zoom: 12,
    layers: [
        layers.PLACE,
        layers.MAGNITUDE,
        layers.TIME,
        layers.COORDINATES
    ]
});
