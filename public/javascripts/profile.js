let occupied;

window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        result = await isOccupied();
        if (result.err) {  throw result.err; }
        occupied = result.user.occupied;

      switch(user.type){
        case 1:
            let navbar = document.querySelector('.navbar');
            navbar.innerHTML = '<ul> <li><a href="index.html">Home</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
            document.body.style.display ="block";
            populatUserInfo();
            populateRentInfo();
            break;

        case 2:
          let navbar1 = document.querySelector('.navbar');
          navbar1.innerHTML = '<ul> <li><a href="dono.html">Cars</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
          document.body.style.display ="block";
            populatUserInfo();
            break;
    }
     } catch (err) {
        console.log(err);
    } 

  
}

/*
        <section class= box>
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Name:</strong> Driver</li>
            <li><strong>Email:</strong> driver@gmail.com</li>
            <li><strong>Phone:</strong> 123123123</li>
          </ul>
        </section>


 */

//! Insert above on section with colunas class
async function populatUserInfo(){
    console.log(user);
    //populate user information to profile
    let title = document.getElementById("profile");
    title.innerText = user.name+"'s Profile";
    let coluna = document.getElementById("coluna");

    let section = document.createElement("section");
    section.setAttribute("class", "box");

    let h3 = document.createElement("h3");
    h3.innerText = "Personal Information";
    section.appendChild(h3);
    let ul = document.createElement("ul");

    let li = document.createElement("li");
    let strong = document.createElement("strong");
    strong.innerText = "Name: ";
    li.innerText = strong.innerText+user.name;
    ul.appendChild(li);

    li = document.createElement("li");
    strong = document.createElement("strong");
    strong.innerText = "Email: ";
    li.innerText = strong.innerText+user.email;
    ul.appendChild(li);

    li = document.createElement("li");
    strong = document.createElement("strong");
    strong.innerText = "Phone: ";
    li.innerText = strong.innerText+user.phone;
    ul.appendChild(li);

    section.appendChild(ul);
    coluna.appendChild(section);
}



/*<section class= box>
    <h3>Rental History</h3>
    <h4>Last Rent:</h4>
    <ul>
      <li><strong>Vehicle:</strong> Golf VII</li>
      <li><strong>Start Date:</strong> XX/XX/XX</li>
      <li><strong>End Date:</strong> XX/XX/XX</li>
      <li><strong>Price:</strong> 120$</li>
      <li><strong>Status:</strong> In Progress</li>
    </ul>
    <input type="submit" value="See All" class="btn"  >
  </section> */
async function populateRentInfo(){
  let rent;
  let result = await getScheduledRent();
  if (result.err) {  throw result.err; }
  rent = result.rents;
  if(!rent.length){
    return;
  }
  let coluna = document.getElementById("coluna");

  let section = document.createElement("section");
  section.setAttribute("class", "box");

  let h3 = document.createElement("h3");
  h3.innerText = "Rental History";
  section.appendChild(h3);

  let h4 = document.createElement("h3");
  if(occupied){
    h3.innerText = "Current Rent:";
  }else{h3.innerText = "Last Rent:";}
  section.appendChild(h4);

  let ul = document.createElement("ul");
  
  let li = document.createElement("li");
  let strong = document.createElement("strong");
  strong.innerText = "Vehicle: ";
  
  li.innerText = strong.innerText+rent.vehicle;
  ul.appendChild(li);

  li = document.createElement("li");
  strong = document.createElement("strong");
  strong.innerText = "Start Date: ";
  let start_date = new Date(rent.start_date);
  li.innerText = strong.innerText+start_date.getDay()+"-"+start_date.getMonth()+"-"+start_date.getFullYear();
  ul.appendChild(li);

  li = document.createElement("li");
  strong = document.createElement("strong");
  strong.innerText = "End Date: ";
  end_date = new Date(rent.end_date);
  li.innerText = strong.innerText+end_date.getDay()+"-"+end_date.getMonth()+"-"+end_date.getFullYear();
  ul.appendChild(li);

  li = document.createElement("li");
  strong = document.createElement("strong");
  strong.innerText = "Price: ";
  li.innerText = strong.innerText+rent.price;
  ul.appendChild(li);

  li = document.createElement("li");
  strong = document.createElement("strong");
  strong.innerText = "Status: ";
  li.innerText = strong.innerText+rent.status;
  ul.appendChild(li);
  section.appendChild(ul);
  if(rent.status == "Scheduled"){
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Cancel Rent");
    submit.setAttribute("class","btn");
    submit.style.marginRight = "20px";
    submit.onclick = ()=>{
      CancelRent(rent.id); 
  };
    section.appendChild(submit);
  }

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "see ALL");
  submit.setAttribute("class","btn");
  submit.onclick = ()=>{
    changetoRenthistory(); 
};

  section.appendChild(submit);
  coluna.appendChild(section);
 
}
function changetoRenthistory(){
  changePage("rent_list.html");
}
async function CancelRent(rentid){
  let result = await deleteRent(rentid);
  if (result.err) {  throw result.err; }
  if(result.successful) {
    window.alert("Rent Cancelled successfully");
    let coluna = document.getElementById("coluna");
    while(coluna.firstChild){
      coluna.removeChild(coluna.firstChild);
    }
    populatUserInfo();
    populateRentInfo();

  }
}

async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}