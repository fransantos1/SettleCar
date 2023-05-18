window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if(result.authenthicated == false){
            document.body.style.display ="block";
            return;
        }



        if(result.err) throw result.err;
        if(result.successful){
            switch(user.type){
                case 1:
                    let occupied = await isOccupied();
                    if(occupied) 
                    {
                        window.location.pathname = "/profile.html";
                    }
                    let navbar = document.querySelector('.navbar');
                    navbar.innerHTML = `<ul> <li><a href="index.html">Home</a></li> <li><a href="profile.html">`+user.name+`</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>`;
                    document.body.style.display ="block";
                    break;

                case 2:
                    window.location.pathname = "/dono.html"
                    break;

                case 3:
                    break;
            }
        }
     } catch (err) {
        console.log(err);
    }
}

function search(){
    let x = document.getElementById("pickup").value;
    let y = document.getElementById("return").value;
    
    if(x === "" && y === ""){
        sessionStorage.setItem("start",x);
        sessionStorage.setItem("return",y);
        window.location.pathname = "cars_list.html";
    }else if(x === ""|| y===""){
        window.alert("Please select pickup and return date!!");
    }else{
        let start_date = new Date(x);
        let return_date = new Date(y);
        start_date.setMonth(start_date.getMonth()+1);
        return_date.setMonth(return_date.getMonth()+1);
        if(return_date < start_date){window.alert("Please select the return date to after the pickup date");return;}
        sessionStorage.setItem("start",start_date);
        sessionStorage.setItem("return",return_date);
        window.location.pathname = "cars_list.html";
    }
    
}

