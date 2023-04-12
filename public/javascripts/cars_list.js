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
    let start_date = sessionStorage.getItem("start");
    let return_date = sessionStorage.getItem("return");
    try {
        if(start_date === ""){
            result = await requestCars();
            if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        }else{
            console.log(":3");
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

            let href = document.createElement("a");
            href.setAttribute("href","#");
            href.setAttribute("class","btn");
            href.textContent = "Rent Now";
            div.appendChild(href);
            carList.appendChild(div);
            
        }
    } catch(err) {
        console.log(err);
    }
}