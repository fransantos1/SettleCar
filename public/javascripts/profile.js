let occupied;

window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        result = await isOccupied();
        occupied = result.user.occupied;

      switch(user.type){
        case 1:
            let navbar = document.querySelector('.navbar');
            navbar.innerHTML = '<ul> <li><a href="index.html">Home</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
            document.body.style.display ="block";
            break;

        case 2:
          let navbar1 = document.querySelector('.navbar');
          navbar1.innerHTML = '<ul> <li><a href="dono.html">Cars</a></li> <li><a href="javascript:logout()">Logout</a></li> </ul>';
          document.body.style.display ="block";
            break;
    }
     } catch (err) {
        console.log(err);
    } 
   
      populatUserInfo();
   // populateRentInfo();
  
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
  
  //populate user information to profile
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