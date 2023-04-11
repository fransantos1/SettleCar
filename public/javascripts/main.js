window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        console.log(result.authenthicated);
        if(result.authenthicated == false){
            document.body.style.display ="block";
            return;
        }
        if(result.err) throw result.err;
        if(result.successful){
            switch(user.type){
                case 1:
                    let navbar = document.querySelector('.navbar');
                    navbar.innerHTML = '<ul> <li><a href="index.html">Home</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
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
    console.log(x);
}

