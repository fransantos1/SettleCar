let year = new Date().getFullYear();
let currentMonth = new Date().getMonth();

window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    document.getElementById("username").textContent = user.name;
    const dayOfWeekName = new Date().toLocaleString(
    'default', {weekDay: 'long'}
    );
    console.log(dayOfWeekName);
    for(i = 0; i < 12; i++) {
        let month = new Date(year, currentMonth+i).getMonth();
        populateCalendar(month, year);
    }
}
async function populateCalendar(month, year){
    let rent = await requestRentsFromCar(1);
    console.log(rent);
    let rentStart = new Date(Date.parse(rent.rents[0].beginning));
    let rentEnd = new Date(Date.parse(rent.rents[0].end));
    console.log(rentStart, rentEnd);

    let currentMonth = new Date().getMonth();
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

    for(let row = 0; row < 5; row++){
        let tr = document.createElement("tr");
        for(let line = 0; line < 7; line++){
            let td = document.createElement("td");
            if(count > lastDay){
                tr.appendChild(td);
                continue;
            }
            if((row == 0 && line >= weekDay-1) || row!=0){ // Places the dates on the correct weekdays
                td.textContent = count;
                count++;
            }
            console.log(count, today);
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
            let monthText = month.toString();
            tr.appendChild(td);   
        }

        monthElement.appendChild(tr);
        calendar.appendChild(monthElement);
    }
}

let selectedCounter = 0;
function selectFunction(clickedElement) {
    if (clickedElement.getAttribute("id") == "selected") {
        selectedCounter--;
        clickedElement.setAttribute("id", "valid");
    } else if (clickedElement.getAttribute("id") == "valid" && selectedCounter != 2) {
        selectedCounter++;
        clickedElement.setAttribute("id", "selected");
    }
    let day = clickedElement.innerHTML;
    let month = new Date(Date.parse(clickedElement.parentNode.parentNode.getElementsByTagName("h1")[0].innerHTML +" 1, 2023")).getMonth()+1;
}