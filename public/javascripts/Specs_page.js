let car;
window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    let carid = sessionStorage.getItem("carid");
    console.log(carid);
    try{
        result = await requestCar(carid);
    }catch(err){
        console.log(err);
    }
    car = result.cars
    populatePage(car);

}
function toggleOverlay(){
    var x = document.getElementById("top");
    if (x.style.display === "none" || x.style.display ==="") {
        x.style.display = "block";
    } else {
    x.style.display = "none";
    }
    
}

function populatePage(car){
    try{
        console.log(car);
        let thumbnail = document.getElementById("left");
        let img = document.createElement("img");
        console.log(car.images);
        img.setAttribute("src",car.images[0]);
        img.setAttribute("onclick","toggleOverlay()");
        img.setAttribute("alt","Car");
        thumbnail.prepend(img);
        
        if(car.car_state === "available"){
            let x = document.getElementById("Unavailable");
            x.style.visibility = "visible";
        }else if(car.car_state === "unavailable"){
            let x = document.getElementById("Unavailable");
            x.textContent("Make Available");
            x.style.color = "Green";
        }  
       
        let carImages = document.getElementById("top");
        for(let images of car.images){
            let imgs = document.createElement("img");
            imgs.setAttribute("src",images);
            imgs.setAttribute("alt","Car");
            carImages.appendChild(imgs);
        }

        let specs = document.getElementById("right");
        let ul = document.createElement("ul");

        let li = document.createElement("li");
        li.textContent = "License Plate: "+ car.licenseplate;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Car: "+ car.brand+" "+car.model+" ("+car.year+")";
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "BHP: "+ car.bhp;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Engine: "+ car.engine;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Fuel: "+ car.fuel;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "GearBox: "+ car.gearbox;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Drivetrain: "+ car.drivetrain;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Doors: "+ car.doors;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Seats: "+ car.seats;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Boot Capacity: "+ car.bootcapacity;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Extras: "+ car.extra_equipment;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Price a day: "+ car.price_day+"€";
        ul.appendChild(li);

        specs.appendChild(ul);
    }catch(err){
        console.log(err);
    }
}
function stateButton(){
    window.alert("Making the car unavailable, wont cancel dates already reserved but will prevent users from making other requests")
 
 }   
 function historyButton(){
 
 }
 function calendarButton(){
 
 }