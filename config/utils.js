const pool = require("../config/database");


module.exports.genToken = function genToken(length) {
   let token = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (let i = 0; i < characters.length; i++) {
       token += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return token;
}



let olddate;
let ctr = 0;
async function verify() {
    if(ctr == 0){
        olddate= new Date();
        //
    }else{
        let newdate = new Date();
        if(newdate.getDay() - olddate.getDay() === 1){
            //
            console.log("changed day");
        }    
    }
    olddate = new Date();
    ctr++;
}
module.exports = {verify};