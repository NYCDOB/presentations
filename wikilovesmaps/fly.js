mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6IlVseGF5ZHMifQ.ofEbyjhY2N_1861THCPFeQ';
var map = new mapboxgl.Map({
  container: 'mapbox-gl',
  style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v6.json',
  center: [52.3727,4.9002],
  zoom: 13,
  interactive: false
});

var activeChapters = [
  "Amsterdam",
  "Atlanta",
  "Austin",
  "Alpes",
  "Ames",
  "Berlin",
  "Bend",
  "Boston",
  "Boulder",
  "Chattanooga",
  "Corvalis",
  "Calgary",
  "Chicago",
  "Cleveland",
  "DC",
  "Detroit",
  "Diliman",
  "Hampton Roads",
  "Johannesburg",
  "Los Angeles",
  "Lexington",
  "Maine",
  "Madison",
  "Miami",
  "Milan",
  "Mile High",
  "Minneapolis/St. Paul",
  "New York City",
  "Oakland",
  "Philadelphia",
  "Portland",
  "Portland/Bangor",
  "Puerto Rico",
  "Pittsburgh",
  "Rome",
  "Seattle",
  "San Francisco",
  "Salt Lake City",
  "Southampton",
  "St. Louis",
  "Sacramento",
  "St. Johns",
  "Toronto",
  "Tulsa",
  "Vancouver",
  "Windsor Essex"
];

var chapters = null;
d3.json("chapters.json", function(json) {
  chapters = json.features;
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function flyToChapter() {
  if (chapters) {
    var found = false,
        chapter;
    while(!found) {
      var i = getRandomInt(0, chapters.length);
      if (chapters[i].geometry &&
        chapters[i].geometry.coordinates &&
        chapters[i].properties.location) {
        chapter = chapters[i];
        var city = chapter.properties.location.split(",")[0];
        if (activeChapters.indexOf(city) > -1) {
          found = true;
        }
      }
    }

    map.flyTo(
      [chapter.geometry.coordinates[1], chapter.geometry.coordinates[0]],
      13,
      0,
      {
        speed: 0.5
      }
    );
  }
}
