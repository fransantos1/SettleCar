const pool = require("../config/database");
const auth = require("../config/utils");
const User = require("../models/usersModel");
const Car = require("../models/carModel");



class rent{
    constructor(id, beggining, end, car_id, usr_id, rent_state){
        this.id = id;
        this.beggining = beggining;
        this.end = end;
        this.car_id = car_id;
        this.usr_id = usr_id;
        this.rent_state = rent_state;
    } 
    static async getRent(){}
    static async updateRent(){}
    static async deleteRent(){}

    static async getAllRentsFromCar_date(){}
    static async getAllRentsFromCar(){}





    static async createRent(start_date, return_date, car, usr){
        try{
            //Verify if the car is available
            //Verify if the user has any other rent
            let dbResult = await pool.query("SELECT * FROM rent WHERE rent_usr_id =$1 and rent_rentstate_id != 3", [usr.id]);
            let Result = dbResult.rows;
            if(Result.length){
                return {
                    status: 400, result: [{
                        location: "body", param: "rent",
                        msg: "This user already has a rent!"
                    }]
                }
            }
            let result = await pool.query("INSERT INTO rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_rentstate_id) VALUES ($1,$2,$3,$4,$5);",
            [start_date, return_date,car.id,usr_id, 1]);

            return { status: 200} ;
        }catch(err){
            console.log(err);
        }
    
    }


}

module.exports = rent;