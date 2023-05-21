
let year = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let rents = [];
window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated){
        changePage("index.html");
    }


    //gets all rents from the car
    let response = await requestRentsFromCar(5);
    if (!result.successful || result.err)
    throw result.err || { err: "Not successfull" }
    for(let rent of response.rents){
        //inserts all the dates into the array
        delete rent.id;
        delete rent.price;
        rent.beginning = new Date(rent.beginning);
        rent.end = new Date(rent.end);
        rents.push(rent);
    }

    if(user.type == 2){
        //se for dono


    }else{
        //se for cliente
    }
    document.getElementById("username").textContent = user.name;
    const dayOfWeekName = new Date().toLocaleString(
        'default', {weekDay: 'long'}
    );

        

        
        populateCalendartoRent();
    
}

async function populateCalendartoRent(){
    let occupied = false;
    let loopCurrentDate = new Date(year, currentMonth, 0);
    let rentPointer =null;
    console.log(rents);
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
                            console.log(loopCurrentDate);
                            console.log(rent.beginning);
                            if(loopCurrentDate.getTime() == rent.beginning.getTime()){
                                console.log("WOOOWP");
                                occupied = true;
                                rentPointer = rent;
                            }
                        }
                    }
                   








                }
                if(count-1 == today && month == currentMonth&& loopCurrentDate.getFullYear() == currentYear ) { // Marcar o dia de hoje
                    td.className = "today";
                    td.setAttribute("id", "valid");
                } else if(count-1 < today && month == currentMonth && loopCurrentDate.getFullYear() == currentYear || 
                loopCurrentDate.getDate() > today && loopCurrentDate.getFullYear() != currentYear && loopCurrentDate.getMonth() == currentMonth) { // Dias invalidos
                    // os dias invalidos são os dias antes de hoje e dias mais do que um ano á frente

                    td.className = "invalid";
                } else if(occupied == true){
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







/*     for(let row = 0; row < 5; row++){//5 weeks in a month
        let tr = document.createElement("tr");

        for(let line = 0; line < 7; line++){//7 days in a month
            let td = document.createElement("td");

            if(count > lastDay){
                tr.appendChild(td);
                continue;
            }
            if((row == 0 && line >= weekDay-1) || row!=0){ // Places the dates on the correct weekdays
                td.textContent = count;
                count++;
            }
            if(count-1 == today && month == currentMonth) { // Marcar o dia de hoje
                td.className = "today";
                td.setAttribute("id", "valid");
            } else if(count-1 < today && month == currentMonth) { // Dias que já passaram no mês atual
                td.className = "past";
            } else if(count != 1) { // Se não ele marca os primeiros dias do mês em branco como válidos
                td.setAttribute("id", "valid");
            }
            td.onclick = () => { // Cria nova função para td
                selectFunction(td);
            }
            tr.appendChild(td);    
        }

        monthElement.appendChild(tr);
        calendar.appendChild(monthElement);
    } */
}

let selectedCounter = 0;
let savedDay = [];
let savedMonth = [];
let savedYear = [];
function selectFunction(clickedElement) {
    if (clickedElement.getAttribute("id") == "selected") {
        selectedCounter--;
        clickedElement.setAttribute("id", "valid");
        savedDay[selectedCounter] = null;
        savedMonth[selectedCounter] = null;
        savedYear[selectedCounter] = null;
    } else if (clickedElement.getAttribute("id") == "valid" && selectedCounter != 2) {
        selectedCounter++;
        clickedElement.setAttribute("id", "selected");
        savedDay[selectedCounter] = clickedElement.innerHTML;
        savedMonth[selectedCounter] = new Date(Date.parse(clickedElement.parentNode.parentNode.getElementsByTagName("h1")[0].innerHTML +" 1, 2023")).getMonth()+1;
        savedYear[selectedCounter] = currentMonth < (savedMonth-1) && currentYear || currentYear+1;
    }
}

function add_rent() {
    if(!savedDay[1] || !savedMonth[1] || !savedYear[1]) {
        return;
    }
    let startDate = new Date(savedYear[0], savedMonth[0], savedDay[0]).toDateString();
    let endDate = new Date(savedYear[0], savedMonth[0], savedDay[0]).toDateString();
    sessionStorage.setItem("startdate",startDate);
    sessionStorage.setItem("enddate",endDate);
}