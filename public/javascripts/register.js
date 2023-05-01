async function register() {
    try {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let pass = document.getElementById("pass").value;
        let checkboxes = document.getElementsByName('check');
        let check = null;
        checkboxes.forEach((item)=>{
            if(item.checked == true){
                check = item.value;
            }
        })
        if(name == '' || email == '' || phone == '' || pass == '' || check == null){
            window.alert("please complete everything");
            return;
        }
        let res = await requestRegister(name , email , phone , pass , check);
        console.log(res);
        if (res.successful) {
            window.location.replace("login.html");
            window.alert("Account created. Going to LoginPage");
        } else {
            window.alert(res.message);
        }      
    } catch (err) {
        console.log(err);
    }
}


//https://stackoverflow.com/questions/9709209/html-select-only-one-checkbox-in-a-group
function onlyOne(checkbox) {
    let checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
