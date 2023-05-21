window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    document.getElementById("username").textContent = user.name;
    populateList();
    document.body.style.display ="block";
}

async function populateList() {
    let rentList = document.getElementById("services-container");
    try {
        let result = await requestOwnerCars(user.id);
        console.log(result);
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        //document.getElementById("remove_link").style.visibility ="visible";
        for (let rent of result.rents) {
            let tr = document.createElement("tr");
            //let car = getRentCar(); fazer depois
            tr.setAttribute("class","item");

            let tr2 = document.createElement("tr");
            tr2.setAttribute("class","item");

            let MODEL = document.createElement("td");
            let model = document.createElement("h3");
           // model.textContent = (car.brand +" "+car.model); 
            MODEL.appendChild(model);
            tr.appendChild(MODEL);

            let STATUS = document.createElement("td");
            let status = document.createElement("h3");
            status.setAttribute("class",rent.rent_state);
            STATUS.appendChild(status);
            tr.appendChild(STATUS);
            
            let BEGINNING = document.createElement("td");
            let beginning  = document.createElement("h3");
            beginning.textContent = (rent.beggining); 
            BEGINNING.appendChild(beginning);
            tr2.appendChild(BEGINNING);

            let END = document.createElement("td");
            let end  = document.createElement("h3");
            end.textContent = (rent.end); 
            END.appendChild(end);
            tr2.appendChild(END);

            rentList.appendChild(tr);
            rentList.appendChild(tr2);
        }
    } catch(err) {
        console.log(err);
    }
}