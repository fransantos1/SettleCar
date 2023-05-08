// Initialize and add the map
let map;

async function initMap() {


  const position = { lat: 38.639330000170084, lng: -8.90202305649855 };
  

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "roadmap",
  });

  
}

initMap();