window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
        let car = JSON.parse(sessionStorage.getItem("car"));
        console.log(":3");
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
        let carImages = document.getElementById("top");
        for(let images of car.images){
            let imgs = document.createElement("img");
            imgs.setAttribute("src",images);
            imgs.setAttribute("alt","Car");
            carImages.appendChild(imgs);
        }
        let thumbnail = document.getElementById("left");
        let img = document.createElement("img");
        img.setAttribute("src",car.images[0]);
        img.setAttribute("onclick","toggleOverlay()");
        img.setAttribute("alt","Car");
        thumbnail.prepend(img);
        
        let specs = document.getElementById("right");
        let ul = document.createElement("ul");

        let li = document.createElement("li");
        li.textContent = "License Plate: "+ car.licenseplate;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Brand: "+ car.brand;
        ul.appendChild(li);

        li = document.createElement("li");
        li.textContent = "Model: "+ car.model;
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
        /*
    let tr = document.createElement("tr");
    tr.setAttribute("class","item");
    
    let checkbox = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "deletecheck");
    input.setAttribute("class", "toggleable");
    input.setAttribute("value", car.licenseplate);
    checkbox.appendChild(input);
    tr.appendChild(checkbox);
    
    let MODEL = document.createElement("td");
    let model = document.createElement("h3");
    model.textContent = (car.brand +" "+car.model); 
    MODEL.appendChild(model);
    tr.appendChild(MODEL);

    let LICENSE = document.createElement("td");
    let license = document.createElement("h3");
    license.textContent = (car.licenseplate); 
    LICENSE.appendChild(license);
    tr.appendChild(LICENSE);

    let STATUS = document.createElement("td");
    let status = document.createElement("span");
    switch(car.car_state){
        case 1:
            status.setAttribute("class","available");
            break;
            
        case 2:
            status.setAttribute("class","unavailable");
            break;
        case 3:
            status.setAttribute("class","workshop");
            break;
    }
    STATUS.appendChild(status);
    tr.appendChild(STATUS);


    let PRICE = document.createElement("td");
    let price = document.createElement("h3");
    price.textContent = (car.price_day+"€"); 
    PRICE.appendChild(price);
    tr.appendChild(PRICE);

    let LOCATION = document.createElement("td");
    let location = document.createElement("img");
    location.setAttribute("src", "imagens/googlemaps.png");
    LOCATION.appendChild(location);
    tr.appendChild(LOCATION);
    LOCATION.onclick =()=>{
        
    };

    carList.appendChild(tr);
    tr.onclick =()=>{
        openSpecsheet(car);
    };

    carList.appendChild(tr);
    */
  
}