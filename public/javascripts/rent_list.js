window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type == 3){
        changePage("index.html");
    }else if(user.type === 2){
        let table_header = document.getElementById("table-header");
        let title = document.createElement("th");
        title.textContent = "Username";
        table_header.prepend(title);
        //get car id
        if(!sessionStorage.getItem("carid")){
            window.alert("an error occurred");
            changePage("index.html");
        }
        let carid = sessionStorage.getItem("carid");
        populateList_owner(carid);
    }else{
        let table_header = document.getElementById("table-header");
        let title = document.createElement("th");
        title.textContent = "vehicle";
        table_header.prepend(title);
        //get user id 
        populateList_User();
    }
    
    document.getElementById("username").textContent = user.name;
    document.body.style.display ="block";
}

async function populateList_owner(carid) {
    let rentList = document.getElementById("table_body");
    rentList.innerHTML ="";
    try {
        let result = await requestRentsHistoryFromCar(carid);
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
/*          <tr>
                <td>Jef</td>
                <td>2023-04-01</td>
                <td>2023-04-04</td>
                <td>$150</td>
                <td><img src="imagens/googlemaps.png"></td>
            </tr>*/
    
        for (let rent of result.rents) {
            let tr = document.createElement("tr");

            let td = document.createElement("td");
            td.textContent = rent.usr;
            tr.appendChild(td);

            let beginning_date = new Date(rent.beginning);
            td = document.createElement("td");
            td.textContent = beginning_date.getDate()+"-"+beginning_date.getMonth()+"-"+beginning_date.getFullYear();
            tr.appendChild(td);

            let end_date = new Date(rent.end);
            td = document.createElement("td");
            td.textContent = end_date.getDate()+"-"+end_date.getMonth()+"-"+end_date.getFullYear() ;
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = rent.price;
            td.onclick =()=>{
             updatePrice(rent.id, carid);
            };
            tr.appendChild(td);

            td = document.createElement("td");
            let img = document.createElement("img");
            img.src = "imagens/googlemaps.png";
            img.onclick =()=>{
                openMap(rent);
            };
            td.appendChild(img);
            tr.appendChild(td);

            rentList.appendChild(tr);
        }
    } catch(err) {
        console.log(err);
    }
    
}
async function populateList_User() {
    let rentList = document.getElementById("table_body");
    try {
        let result = await requestRentsHistoryFromUser();
        if (!result.successful || result.err)
           throw result.err || { err: "Not successfull" }
        let rents = result.rents;
        //document.getElementById("remove_link").style.visibility ="visible";
/*          <tr>
                <td>Toyota Camry</td>
                <td>2023-04-01</td>
                <td>2023-04-04</td>
                <td>$150</td>
                <td><img src="imagens/googlemaps.png"></td>
            </tr>*/

            for (let rent of result.rents) {
                let tr = document.createElement("tr");
    
                let td = document.createElement("td");
                td.textContent = rent.vehicle;
                tr.appendChild(td);
                
                let beginning_date = new Date(rent.beginning);
                td = document.createElement("td");
                td.textContent = beginning_date.getDate()+"-"+beginning_date.getMonth()+"-"+beginning_date.getFullYear();
                tr.appendChild(td);

                let end_date = new Date(rent.end);
                td = document.createElement("td");
                td.textContent = end_date.getDate()+"-"+end_date.getMonth()+"-"+end_date.getFullYear() ;
                tr.appendChild(td);
    
                td = document.createElement("td");
                td.textContent = rent.price;
                td.onclick =()=>{
                 updatePrice(rent.id, carid);
                };
                tr.appendChild(td);
    
                td = document.createElement("td");
                let img = document.createElement("img");
                img.src = "imagens/googlemaps.png";
                img.onclick =()=>{
                    openMap(rent);
                };
                td.appendChild(img);
                tr.appendChild(td);
    
                rentList.appendChild(tr);
            }
    } catch(err) {
        console.log(err);
    }
}
function openMap(rent){
    sessionStorage.setItem("rent",JSON.stringify(rent));
    window.location.href = "maps.html";
}

async function updatePrice(rentid, carid){
    window.alert("Verifying price penalty");
    await verifyRent(rentid);
    populateList_owner(carid);

}