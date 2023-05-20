window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    document.getElementById("username").textContent = user.name;
    populateList();
    document.body.style.display ="block";
}
let deleting = false;
async function populateList() { 
    deleting = false;
    let carList = document.getElementById("services-items");
    while (carList.firstChild) {    
        carList.removeChild(carList.firstChild);
    } 
    try {
        let result = await requestOwnerCars(user.id);
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        for (let car of result.cars) {

            let tr = document.createElement("tr");
            tr.setAttribute("class","item");

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
            status.setAttribute("class",car.car_state);
            STATUS.appendChild(status);
            tr.appendChild(STATUS);


            let PRICE = document.createElement("td");
            let price = document.createElement("h3");
            price.textContent = (car.rent+"€"); 
            PRICE.appendChild(price);
            tr.appendChild(PRICE);

            let LOCATION = document.createElement("td");
            let location = document.createElement("img");
            location.setAttribute("src", "imagens/googlemaps.png");
            LOCATION.appendChild(location);
            tr.appendChild(LOCATION);
            LOCATION.onclick =()=>{
                //Open map 
            };
            let DELETE = document.createElement("td");
            let deletion = document.createElement("img");
            deletion.setAttribute("src", "imagens/trashcan.png");
            DELETE.appendChild(deletion);
            tr.appendChild(DELETE);
            DELETE.onclick = ()=>{
                deleting = true;
                deletecar(car);  
            };
            tr.onclick =()=>{         
              openSpecsheet(car);
            };
            carList.appendChild(tr);
        }
    } catch(err) {
        console.log(err);
    }
}
function openSpecsheet(car){
    if(deleting == false){
        sessionStorage.setItem("carid",car.id);
        window.location.pathname = "car_specs.html";
    }
}
async function deletecar(car){
    if (window.confirm("Delete this car? (" + car.brand + " " + car.model + ")")) {
        let result = await DeleteCars(car.licenseplate);
        window.alert(result.msg);
        if (!result.successful || result.err)
        throw result.err || { err: "Not successfull" }
        populateList();
    }
}
