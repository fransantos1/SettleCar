window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    document.getElementById("username").textContent = user.name;
    populateList();
    document.body.style.display ="block";
}

async function toggleDelete(){
    var x = document.getElementsByClassName("toggleable");
    for(let y of x){
        if (y.style.visibility === "hidden" || y.style.visibility === "") {
        y.style.visibility = "visible";
        } else {
            if(y.checked){
                y.click();
            }
        y.style.visibility = "hidden";
        }
    }
}

async function deletecar(){
    let x = document.getElementsByClassName("toggleable");
    for(let y of x){
        if(y.checked){
            let result = await DeleteCars(y.value);
            if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        }
    }
    window.location.reload();
}
async function populateList() {
    let carList = document.getElementById("services-container");
    try {
        let result = await requestOwnerCars(user.id);
        console.log(result);
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        document.getElementById("remove_link").style.visibility ="visible";
        for (let car of result.cars) {
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
                
            };

            carList.appendChild(tr);
            tr.onclick =()=>{

                let x = document.getElementById("Confirm_delete");
                if(x.style.visibility !== "visible"){
                    openSpecsheet(car);
                }
                
            };

            carList.appendChild(tr);
            
        }
    } catch(err) {
        console.log(err);
    }
}
function openSpecsheet(car){
    console.log(car);
    sessionStorage.setItem("carid",car.id);
    window.location.pathname = "car_specs.html";
}