window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
    document.getElementById("username").textContent = user.name;
    document.body.style.display ="block";
}


function addImg_list(){
    let link = document.getElementById("imageLink").value;
    document.getElementById("imageLink").value = "";
    let link_item = document.createElement("li");
    let container = document.getElementById("images_container");
    link_item.textContent = link;
    link_item.setAttribute("class","links");
    link_item.onclick =()=>{
        link_item.parentNode.removeChild(link_item);
    };
    container.appendChild(link_item);
}
async function add_car(){
    let car = {};
    car.license = (document.getElementById("lp_1").value + "-" +  document.getElementById("lp_2").value +"-" +document.getElementById("lp_3").value).toUpperCase();
    car.brand =document.getElementById("brand").value;
    car.model =document.getElementById("model").value;
    car.year =document.getElementById("year").value;
    car.bhp =document.getElementById("bhp").value;
    car.engine = document.getElementById("engine").value;   
    car.fuel = document.getElementById("fuel").value;
    car.gearbox = document.getElementById("n_gears").value+document.getElementById("gear_type").value;
    car.drivetrain = document.getElementById("drivetrain").value;
    car.door_n = document.getElementById("door_n").value;
    car.seat_n = document.getElementById("seat_n").value;
    car.bootcapacity = document.getElementById("boot_capacity").value;
    car.priceday = document.getElementById("priceday").value;
    car.extras = [];
    for(let i = 0; i < document.getElementById("extra_equipment").children.length; i++){
        let element = document.getElementById("extra_equipment").children[i];
        if(element.checked){
            car.extras.push(element.value);
        }
    }
    car.services = {};
    car.services.inspection = document.getElementById("insp_due_date").value;
    car.services.insurance = document.getElementById("insurance_due_date").value;

    car.images = [];
    for(let i = 0; i < document.getElementById("images_container").children.length; i++){
        car.images.push(document.getElementById("images_container").children[i].textContent);
    }
    console.log(car);
    let result = await AddCar(car);
    if(!result.successful && result.msg.param == "specs"){
        window.alert(result.msg.msg);
        return;
    }
    console.log(result);
    if(result.successful){
        window.alert("Registado com sucesso!");
        changePage("index.html");
    }
}