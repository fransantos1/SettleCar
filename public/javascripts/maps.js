const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
let date = {};
let beggining;
let end;
let geojson;
let map;
async function initMap() {
  map = new Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 43.480988907431055, lng: 1.5704111996239565 },
    mapId: "roadmap",
  });

  map.setOptions({ minZoom: 5});
  let rent = JSON.parse(sessionStorage.getItem("rent"));
  beggining = new Date(rent.biggining);
  end =new Date (rent.end);
  date.before = new Date(rent.end);
  date.current = new Date(rent.beggining);
  console.log(date);


  if(date.before.getDate != date.current.getDate()+1) {
    date.next = new Date(rent.beggining);
    console.log(date.next);
    date.next.setDate(date.next.getDate()+1);
  }else{
    date.next = date.before;
  }


  console.log(date);
  populateMap();


  //CHANGE DATE route
  const centerControlDiv = document.createElement("div");
  centerControlDiv.setAttribute("class", "controls");
  let centerControl = createCenterControl();
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  //toggle buttons
  const rightControlDiv = document.createElement("div");
  rightControlDiv.setAttribute("class", "controls");
  let rightcontrol = createnontoggleButtons();
  rightControlDiv.appendChild(rightcontrol);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(rightControlDiv);
  

}
function createCenterControl() {
  let uppersection = document.createElement("section");
  uppersection.style.display = "flex";
  uppersection.style.flexDirection = "row";
  uppersection.style.margin = "8px 0 22px";
  uppersection.style.padding = "0 5px";
  uppersection.style.alignItems = "center";

  let leftbutton = document.createElement("button");
  leftbutton.textContent = "<";
  leftbutton.addEventListener("click", () => {

    if(beggining.getDate() != date.current.getDate()) {

      date.next.setDate(date.current.getDate());
      date.current.setDate(date.before.getDate()-1);
      date.before.setDate(date.before.getDate()-1);
      datetxt.textContent = date.current.getDate()+"-"+(date.current.getMonth()+1)+"-"+date.current.getFullYear();
    }else{
      date.next.setDate(date.current.getDate());
      date.current.setDate(end.getDate());
      date.before.setDate(date.current.getDate());
      datetxt.textContent = date.current.getDate()+"-"+(date.current.getMonth()+1)+"-"+date.current.getFullYear();
    }
  
    console.log(date);

    //populateMap();






  });
  uppersection.appendChild(leftbutton);
  let datetxt = document.createElement("h1");
  datetxt.textContent = date.current.getDate()+"-"+(date.current.getMonth()+1)+"-"+date.current.getFullYear();
  uppersection.appendChild(datetxt);

  let rightbutton = document.createElement("button");
  rightbutton.textContent = ">";
  rightbutton.addEventListener("click", () => {
  });
  uppersection.appendChild(rightbutton);
  return uppersection;
}
function createnontoggleButtons() {
  let section = document.createElement("section");
  section.style.display = "flex";
  section.style.flexDirection = "column-reverse";
  section.style.margin = "8px 0 22px";
  section.style.padding = "0 5px";
  section.style.alignItems = "center";

  let pointstoggle = document.createElement("button");
  pointstoggle.textContent = "Toggle Points";
  pointstoggle.addEventListener("click", () => {
    togglePoints();  
  });
  section.appendChild(pointstoggle);
  let roadtoggle = document.createElement("button");
  roadtoggle.textContent = "toggle no parking zones";
  roadtoggle.addEventListener("click", () => {
    toggleParking();  
  });
  section.appendChild(roadtoggle);
  let allowdzone = document.createElement("button");
  allowdzone.textContent = "toggle Prohibited zone";
  allowdzone.addEventListener("click", () => {
    toggleAllowdMap();
  });
  section.appendChild(allowdzone);

  return section;
}
function togglePoints(){
  map.data.setStyle(function (feature) {
    if(feature.getProperty("type") != "route_point"){
      return {
        visible: feature.getProperty("visible"),
      }
    }
    feature.setProperty("visible",!feature.getProperty("visible"));
    return {
      visible: feature.getProperty("visible"),
      animation: google.maps.Animation.DROP
    }
     
  });
}
function toggleParking(){
  map.data.setStyle(function (feature) {
    if(feature.getProperty("type") != "no_parking"){
      return {

        visible: feature.getProperty("visible"),
      }
    }
    feature.setProperty("visible",!feature.getProperty("visible"));
    return {
      fillColor: 'red',
      visible: feature.getProperty("visible"),
      
    }
     
  });
}
function toggleAllowdMap(){
  map.data.setStyle(function (feature) {
    if(feature.getProperty("type") != "allowed_map"){
      return {
        visible: feature.getProperty("visible"),
      }
    }
    feature.setProperty("visible",!feature.getProperty("visible"));
    return {
      fillColor: 'green',
      visible: feature.getProperty("visible"),
    }
     
  });

}
async function populateMap(){
  map.data.setStyle({visible: false});
  try {
    let result = await requestRentCourseOwner(5,date.current.getDate()  + "-" + (date.current.getMonth()+1) + "-" + date.current.getFullYear() );
    if(!result.successful){
      return;
    }
    geojson = result.result.geojson;
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(geojson);
  let index = Math.floor(geojson.features[0].geometry.coordinates.length/2);
  const position = { lat: geojson.features[0].geometry.coordinates[index][1], lng: geojson.features[0].geometry.coordinates[index][0] };
  map.moveCamera({
    center: new google.maps.LatLng(position.lat, position.lng),
    zoom: 18,
    heading: 320,
    tilt: 47.5
  });
  map.data.addGeoJson(geojson);

  map.data.setStyle(function (feature) {
    if(feature.getProperty("type") == "no_parking"){
      feature.setProperty("visible", false);
      return {
        fillColor: 'red',
        visible:false,
      }
    }else if(feature.getProperty("type") == "allowed_map"){
      feature.setProperty("visible", false);
      return {
        fillColor: 'green',
        visible:false,
      }
    }else if(feature.getProperty("type") == "route_point"){
      feature.setProperty("visible", false);
      return {
        visible:false,
      }
    }

  });
  
//https://stackoverflow.com/questions/23814197/creating-infowindows-on-features-loaded-via-loadgeojson
  var infowindow = new google.maps.InfoWindow();
  map.data.addListener('click', function(event) {
    var time = event.feature.getProperty("time");
    infowindow.setContent("<div style='width:150px; text-align: center;'>"+time+"</div>");
    infowindow.setPosition(event.feature.getGeometry().get());
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infowindow.open(map);
  });  



}



initMap();