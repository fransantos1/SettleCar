window.onload = async function () {
const dayOfWeekName = new Date().toLocaleString(
  'default', {weekday: 'long'}
);
console.log(dayOfWeekName);
let year = new Date().getFullYear();
const month = new Date().getMonth();
populateCalendar( month, year);
}

function populateCalendar(month, year){
    const date2 = new Date(year,month,1).getDay();
    const date3 = new Date(year,month+1,0).getDate();
    let count = 1;
    let calendar = document.getElementById("calendar");
    for(let i = 0; i<5;i++){
        let tr = document.createElement("tr");
        for(let j = 0;j<7;j++){
            let td = document.createElement("td");
            if(count > date3){
                tr.appendChild(td);
                continue;
            }
            if( i == 0 && j >= date2-1 || i!=0 ){
            td.textContent = count;
            count ++;
            }
            tr.appendChild(td);
            
        }
        calendar.appendChild(tr);
    }
}