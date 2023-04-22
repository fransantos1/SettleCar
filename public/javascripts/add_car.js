

function addImg_list(){
    let link = document.getElementById("imageLink").value;
    document.getElementById("imageLink").value = "";
    let link_item = document.createElement("li");
    let container = document.getElementById("images_container");
    link_item.textContent = link;
    link_item.setAttribute("class","links");
    container.appendChild(link_item);
}


function add_car(){

    //!this goes to the API
    //verifying if is a valid license plate

    //verifying if every part of the license is all either a letter or a number and if it contains 2 numbers
    if(!/^[0-9]+$/.test(document.getElementById("lp_1").value) && !/^[a-z]+$/.test(document.getElementById("lp_1").value) || document.getElementById("lp_1").value == null || 
    document.getElementById("lp_1").value.length != 2){
        window.alert("Please verify if you inserted the license plate correctly");
        return;
    };
    if(!/^[0-9]+$/.test(document.getElementById("lp_2").value) && !/^[a-z]+$/.test(document.getElementById("lp_2").value) || document.getElementById("lp_2").value == null || 
    document.getElementById("lp_2").value.length != 2){
        window.alert("Please verify if you inserted the license plate correctly");
        return;
    };
    if(!/^[0-9]+$/.test(document.getElementById("lp_3").value) && !/^[a-z]+$/.test(document.getElementById("lp_3").value) ||
     document.getElementById("lp_3").value == null || document.getElementById("lp_3").value.length != 2){
        window.alert("Please verify if you inserted the license plate correctly");
        return;
    };
    let license = (document.getElementById("lp_1").value + "-" +  document.getElementById("lp_2").value +"-" +document.getElementById("lp_3").value).toUpperCase();
    //verifying the number of numbers in a license
    if(license.replace(/[^0-9]/g,"").length >4 || license.replace(/[^0-9]/g,"").length == 0){
        window.alert("Please verify if you inserted the license plate correctly");
        return;
    }
    let brand =document.getElementById("brand").value;
    if(brand == ""){
        window.alert("please insert a valid brand");
        return;
    }
    let model =document.getElementById("model").value;
    if(model == ""){
        window.alert("please insert a valid model");
        return;
    }
    
    let year =document.getElementById("year").value;
    if(year == ""){
        window.alert("please insert a valid year");
        return;
    }
    let bhp =document.getElementById("bhp").value;
    if(bhp == ""){
        window.alert("please insert a valid bhp");
        return;
    }
    let engine = document.getElementById("engine").value;
    if(engine == ""){
        window.alert("please insert a valid engine");
        return;
    }
    let fuel = document.getElementById("fuel").value;
    if(fuel == ""){
        window.alert("please insert a valid fuel");
        return;
    }
    let gearbox = document.getElementById("n_gears").value+document.getElementById("gear_type").value;
    if(  document.getElementById("n_gears") == ""+document.getElementById("gear_type").value == ""){
        window.alert("please insert a valid gear");
        return;
    }

    let drivetrain = document.getElementById("drivetrain").value;
    if(  drivetrain == ""){
        window.alert("please insert a valid drivetrain");
        return;
    }
    let door_n
    let seat_n
    let bootcapacity
    let priceday
    let extras

    let services
    let images
}