
let year = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let rents = [];
let max;
let carid;
window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated){
        window.alert("Please login before continuing.")
        changePage("login.html");
    }
    carid = sessionStorage.getItem("carid");
    if(!carid){
        window.alert("Some error occurred happened");
        changePage("index.html");
    }
    //gets all rents from the car
    let response = await requestCarAvaliability(carid);
    if (!result.successful || result.err)
    throw result.err || { err: "Not successfull" }
    console.log(response.car);
    max = new Date(response.car.max);
    if(response.car.rents.length){
        for(let rent of response.car.rents){
            //inserts all the dates into the array
            delete rent.id;
            delete rent.price;
            rent.beginning = new Date(rent.beginning);
            rent.end = new Date(rent.end);
            rents.push(rent);
        }
    }

    if(user.type == 2){
        //se for dono


    }else{
        //se for cliente
    }
    document.getElementById("username").textContent = user.name;


        

        
        populateCalendartoRent();
    
}

async function populateCalendartoRent(){
    let occupied = false;
    let loopCurrentDate = new Date(year, currentMonth, 0);
    let rentPointer =null;
    for(i = 0; i < 13; i++) {   
        let month = new Date(year, currentMonth+i).getMonth();
        let monthNameTemp = new Date(year, month).toLocaleDateString('en-us',{month: 'long'})
        const monthName = monthNameTemp.charAt(0).toUpperCase() + monthNameTemp.slice(1)
        const today = new Date().getDate();
        const weekDay = new Date(year,month,1).getDay();
        const lastDay = new Date(year,month+1,0).getDate();

        let count = 1; // Current day in loop
        let calendar = document.getElementById("calendar");

        let monthElement = document.createElement("table");
        monthElement.setAttribute("id", "month")

        let monthNameElement = document.createElement("h1");
        monthNameElement.textContent = monthName;
        monthElement.appendChild(monthNameElement);

        let weekdayHolder = document.createElement("tr")
        let mon = document.createElement("th");
        let tue = document.createElement("th");
        let wed = document.createElement("th");
        let thu = document.createElement("th");
        let fri = document.createElement("th");
        let sat = document.createElement("th");
        let sun = document.createElement("th");
        mon.textContent="Mon"
        tue.textContent="Tue"
        wed.textContent="Wed"
        thu.textContent="Thu"
        fri.textContent="Fri"
        sat.textContent="Sat"
        sun.textContent="Sun"
        weekdayHolder.appendChild(mon);
        weekdayHolder.appendChild(tue);
        weekdayHolder.appendChild(wed);
        weekdayHolder.appendChild(thu);
        weekdayHolder.appendChild(fri);
        weekdayHolder.appendChild(sat);
        weekdayHolder.appendChild(sun);
        monthElement.appendChild(weekdayHolder);

        

        let row = 0;
        while(count <= lastDay){ //5 weeks in a month
            let tr = document.createElement("tr");
            for(let line = 0; line < 7; line++){//7 days in a month
                let td = document.createElement("td");
                if(count > lastDay){
                    tr.appendChild(td);
                    continue;
                }
                if((row == 0 && line >= weekDay-1) || row!=0){ // Places the dates on the correct weekdays
                    loopCurrentDate.setDate(loopCurrentDate.getDate()+1);
                    td.textContent = loopCurrentDate.getDate();
                    count++;
                    //get a rent
                    if(rentPointer == null){
                      
                        for( let rent of rents){

                            if(loopCurrentDate.getTime() == rent.beginning.getTime()){
                                occupied = true;
                                rentPointer = rent;
                            }
                        }
                    }

                }
                if(loopCurrentDate.getTime() > max.getTime()){
                    td.className = "occupied";
                }
                if(count-1 == today && month == currentMonth&& loopCurrentDate.getFullYear() == currentYear ) { // Marcar o dia de hoje
                    td.className = "today";
                    td.setAttribute("id", "valid");
                } else if(count-1 < today && month == currentMonth && loopCurrentDate.getFullYear() == currentYear || 
                loopCurrentDate.getDate() > today && loopCurrentDate.getFullYear() != currentYear && loopCurrentDate.getMonth() == currentMonth) { // Dias invalidos
                    // os dias invalidos são os dias antes de hoje e dias mais do que um ano á frente

                    td.className = "invalid";
                } else if(occupied == true ){
                    td.className = "occupied";
                    if(loopCurrentDate.getTime() == rentPointer.end.getTime()){
                        rentPointer = null;
                        occupied = false;
                    }
                }else if(count != 1) { // Se não ele marca os primeiros dias do mês em branco como válidos
                    td.setAttribute("id", "valid");
                }

                td.setAttribute("date", loopCurrentDate);
                td.onclick = () => { // Cria nova função para td
                    selectFunction(td);
                }
                tr.appendChild(td);  

            }

            monthElement.appendChild(tr);
            calendar.appendChild(monthElement);
            row ++;
        }

    } 
}

let selectedCounter = 0;
let savedDates = [];
function selectFunction(clickedElement) {
    //verifies if is selected and remoevs
    if (clickedElement.getAttribute("id") == "selected") {
        selectedCounter--;
        clickedElement.setAttribute("id", "valid");
        //removes from the savedDates array
        let index = savedDates.indexOf(clickedElement.getAttribute("date"));
        if(index > -1){
            savedDates.splice(index, 1);
        }
    } else if (clickedElement.getAttribute("id") == "valid" && selectedCounter != 2) {
        selectedCounter++;
        clickedElement.setAttribute("id", "selected");
        savedDates.push(clickedElement.getAttribute("date"));
    }
}

async function add_rent() {
    if(savedDates.length != 2){
        window.alert("Please select 2 valied dates");
        return;
    }
    let start_date = new Date(savedDates[0]);
    let return_date = new Date(savedDates[1]);
    if(start_date.getTime() > return_date.getTime()){
        let temp = start_date;
        start_date = return_date;
        return_date = temp;
    }

    let result = await CreateRent(start_date, return_date, carid);
    if (!result.successful || result.err)
    throw result.err || { err: "Not successfull" } 
    changePage("profile.html");
}