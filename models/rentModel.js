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
    static async createRent(car, usr_id){
    
    }


}

module.exports = rent;