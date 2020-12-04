// get url
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-10-10&endtime=2020-10-15";

//set up map
var myMap = L.map("mapid", {
  center: [
    37.09, -95.71
  ],
  zoom: 3,
});

//add tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  }).addTo(myMap);

// if/then color chooser
function chooseColor(depth) {
  if (-10 <= depth && depth <= 10)
    return "red";
  else if (10 < depth && depth <= 30)
    return "darkorange";
  else if (30 < depth && depth <= 50)
    return "orange";
  else if (50 < depth && depth <= 70)
    return "yellow";
  else if (70 < depth && depth <= 90)
    return "lightgreen";
  else if (depth > 90)
    return "darkgreen";
  else
    return "black";
}

//circleMarkers
d3.json(queryUrl).then(function (data) {
  L.geoJSON(data,
    {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,
          {
            radius: feature.properties.mag * 5,
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            fillOpacity: 1
          });
    
        function style(feature) {
            return {
                weight: 1.5,
                opacity: 1,
                fillOpacity: 1,
                radius: 6,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: "grey"
            };
        }
      }
    }).addTo(myMap);
});

