let start_date;
let return_date;
window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(result.authenthicated ){
        if(user.type !== 1){
            changePage("index.html");
        }
        let navbar = document.querySelector('.navbar');
                    navbar.innerHTML = '<ul> <li><a href="index.html">Home</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
                    document.body.style.display ="block";
    }
    populateList();

}
async function populateList() {
    let result;
    let carList = document.getElementById("result");
    start_date = sessionStorage.getItem("start");
    return_date = sessionStorage.getItem("return");
    try {
        if(start_date === ""){
            result = await requestCars();
            if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        }else{
            result = await requestSearchCars(start_date, return_date);
        }
        for (let car of result.cars) {
            let div = document.createElement("div");
            div.setAttribute("class","box");
           
            let div1 = document.createElement("div");
            div1.setAttribute("class","box-img");

            let img = document.createElement("img");
            img.setAttribute("src", car.image);
            img.setAttribute("alt", "car");
            div1.appendChild(img);
            div.appendChild(div1);

            let h3 = document.createElement("h3");
            h3.textContent = car.brand+" "+car.model+" "+car.year;
            div.appendChild(h3);
            let h4 = document.createElement("h4");
            h4.textContent = car.rent+"€/day";     
            div.appendChild(h4);
            if(start_date != "" ){
                let href = document.createElement("a");
                href.setAttribute("href","#");
                href.setAttribute("class","btn");
                href.textContent = "Rent Now";
                div.appendChild(href);
            }
            div.onclick =()=>{
                turnOnOverlay(car);
            };
            carList.appendChild(div);
            
        }
    } catch(err) {
        console.log(err);
    }
}
async function turnOnOverlay(car){
    try{
        let result = await requestCar(car.id);
        if(!result.successful || result.err){
            throw result.err || { err: "Not successfull" }
        }
        car = result.car;
    }catch(err)
    {
        console.log(err);
        return;
    }
    /*
    <div id="item">
        <button type="button" id="exit" onclick=javascript:turnOffOverlay()> &times;</button>
        <section id = "top">
            <img src ="https://media.discordapp.net/attachments/1094210400469397614/1094210455838408764/Passa_image1.jpg?width=1246&height=701" alt = "car">
            <img src ="https://media.discordapp.net/attachments/1094210400469397614/1094210456354295868/Passat_image2.jpg?width=1246&height=701" alt= "car">
        </section>
        <section id = "bottom">
            <section id = "specs">
                <h1>Volkswagen Passat 1.9tdi (2001)</h1>
                <ul>
                    <li>140BHP</li>
                    <li>Diesel</li>
                    <li>5 speed Manual</li>
                    <li>FTW</li>
                    <li>5</li>
                    <li>490L</li>
                    <li>Extra Features:
                        <ul>
                            <li>AC</li>
                            <li>heated seat</li>
                            <li>Bluetooth Radio</li>
                        </ul>
                    </li>
                </ul>
            </section>
        </section>
        <div id = "button">
            <button type="button">See avaliability</button>
        </div>
    </div>*/
    let overlay = document.getElementById("overlay");

    let item = document.createElement("div");
    item.setAttribute("id","item");
    overlay.appendChild(item);

    let exit = document.createElement("button");
    exit.setAttribute("id","exit");
    exit.setAttribute("onclick","turnOffOverlay()");
    exit.innerText = "&times;";
    item.appendChild(exit);

    let top = document.createElement("section");
    top.setAttribute("id","top");
    item.appendChild(top);

    for(let image of car.images){
        let img = document.createElement("img");
        img.setAttribute("src", image);
        img.setAttribute("alt", "car");
        top.appendChild(img);
    }

    let bottom = document.createElement("section");
    bottom.setAttribute("id","bottom");
    item.appendChild(bottom);

    let specs = document.createElement("section");
    specs.setAttribute("id","specs");
    bottom.appendChild(specs);

    let h1 = document.createElement("h1");
    h1.textContent = car.brand+" "+car.model+" "+car.engine+" ("+car.year+")";
    specs.appendChild(h1);

    let ul = document.createElement("ul");
    specs.appendChild(ul);

    let li_hp = document.createElement("li");
    li_hp.textContent = car.bhp;
    ul.appendChild(li_hp);

    let li_fuel = document.createElement("li");
    li_fuel.textContent = car.fuel;
    ul.appendChild(li_fuel);

    let li_gear = document.createElement("li");
    li_gear.textContent = car.gearbox;
    ul.appendChild(li_gear);

    let li_drivetrain = document.createElement("li");
    li_drivetrain.textContent= car.drivetrain;
    ul.appendChild(li_drivetrain);
    
    let li_seats = document.createElement("li");
    li_seats.textContent = car.seats;
    ul.appendChild(li_seats);

    let li_boot = document.createElement("li");
    li_boot.textContent = car.boot +"L";
    ul.appendChild(li_boot);

    let li_EF = document.createElement("li");
    li_EF.textContent = "Extra Features: ";
    ul.appendChild(li_EF);

    let ul_ef = document.createElement("ul");
    li_EF.appendChild(ul_ef);

    let features = car.extra_equipment.split(";");
    for(let feature of features){
        let li = document.createElement("li");
        li.textContent = feature;
        ul_ef.appendChild(li);
    }
    let button_div = document.createElement("div");
    button_div.setAttribute("id","button");
    item.appendChild(button_div);

    if(start_date == "" ){
        let button = document.createElement("button");
        button.setAttribute("type","button");
        button.innerText = "See avaliability";
        button_div.appendChild(button);
        button.onclick = ()=>{
            //!SHOW CALENDAR
        };

    }else{
        let button = document.createElement("button");
        button.setAttribute("type","button");
        button.innerText = "Rent Now";
        button_div.appendChild(button);
        button.onclick = ()=>{
            //!START A RENT A GO TO PROFILE PAGE
        };
    }
    

    overlay.style.display = "block";
}



async function turnOffOverlay(){
    let overlay = document.getElementById("overlay");
    while(overlay.firstChild){
        overlay.removeChild(overlay.firstChild);
    }
    overlay.style.display = "none";
}
