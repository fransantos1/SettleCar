window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if(result.err) throw result.err;

        if(result.successful){
            switch(user.type){
                case 1:
                    let navbar = document.querySelector('.navbar');
                    navbar.innerHTML = '<ul> <li><a href="index.html">Home</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
                    break;

                case 2:
                    window.location.pathname = "/dono.html"
                    break;

                case 3:
                    break;
            }
        }
        
     } catch (err) {

    }
}
