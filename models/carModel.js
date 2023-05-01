const pool = require("../config/database");
const auth = require("../config/utils");
const User = require("../models/usersModel");

function dbCartocar(db){
    return new Car(db.car_id,db.car_licenseplate, db.car_brand, db.car_model,db.car_year,db.car_bhp, db.car_engine, db.car_fuel,db.car_gearbox, db.car_drivetrain, db.car_doors, db.car_seats,db.car_bootcapacity,db.car_equi_ext, db.car_priceday,db.carstate_state,db.car_usr_id);
}

class repair{

}

class Car{
    constructor(id, licenseplate, brand, model,year,bhp, engine, fuel, gearbox, drivetrain, doors, seats, bootcapacity, extra_equipment, price_day, car_state, user_id) {
        this.id = id;
        this.licenseplate = licenseplate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.bhp = bhp;
        this.engine = engine;
        this.fuel = fuel;
        this.gearbox = gearbox;
        this.drivetrain = drivetrain;
        this.doors = doors;
        this.seats = seats;
        this.bootcapacity = bootcapacity;
        this.extra_equipment = extra_equipment;
        this.price_day = price_day;
        this.car_state = car_state;
        this.user_id = user_id;
    }
    static async getByid(carid) {
        try{
            let dbResult = await pool.query("Select * from car where car_id = $1", [carid]);
            let dbCar = dbResult.rows[0];
            if (!dbCar){
                return {
                    status: 400, result: [{
                        location: "body", param: "car",
                        msg: "Car not found"
                    }]
                }
            }
            let car = dbCartocar(dbCar);
            car.licenseplate = "";
            car.car_state = "";
            car.user_id ="";
            let dbImages = await pool.query("Select * from carimage where carimage_car_id = $1",[car.id]);
            let iimages = dbImages.rows;
            let images = [];
            for(let image of iimages){
                images.push(image.carimage_link);
            }
            car.images = images;
            return { status: 200, result: car} ;
        } catch (err) {
            console.log(err);
        }       

    }
    static async getCars_owner(userid) {
        try {
            let dbResult = await pool.query("Select * from car inner join carstate on car_carstate_id = carstate_id where car_usr_id=$1", [userid]);
            let dbCars = dbResult.rows;
            if (!dbCars.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "cars",
                        msg: "This user has no registered cars"
                    }]
                }
            let cars = [];
            for (let dbCar of dbCars) {
                let car = new Car();
                car.id = dbCar.car_id;
                car.model = dbCar.car_model;
                car.brand = dbCar.car_brand;
                car.licenseplate = dbCar.car_licenseplate;
                car.car_state = dbCar.carstate_state;
                car.rent = dbCar.car_priceday;
                cars.push(car);               
            }
            return { status: 200, result: cars} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async getCar_owner(userid,carid) {
        try {
            let dbResult = await pool.query("Select * from car inner join carstate on car_carstate_id = carstate_id where car_id = $1", [carid]);
            let dbCar = dbResult.rows[0];
            if(dbCar.car_usr_id !== userid)
                return {
                    status: 400, result: [{
                        location: "body", param: "user",
                        msg: "This car doenst belong to user"
                    }]
                }

                let car = dbCartocar(dbCar);
                let dbImages = await pool.query("Select * from carimage where carimage_car_id = $1",[car.id]);
                let iimages = dbImages.rows;
                let images = [];
                for(let image of iimages){
                    images.push(image.carimage_link);
                }
                car.images = images;
            return { status: 200, result: car} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    
//!WIP
    static async OwnerChangeState(carid,usrid) {
        try {
            let dbResult = await pool.query("Select * from car where car_id = $1", [carid]);
            let dbCar = dbResult.rows[0];
            if(dbCar.car_usr_id!== usrid)
            return {
                status: 400, result: [{
                    location: "body", param: "user",
                    msg: "This car doenst belong to user"
                }]
            }
            if(dbCar.car_carstate_id === 1){

            }
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
        //!IN BOTH GETBYSEARCH AND GETBYAVALIABILITY NEEDS TO VERIFY IF THE CARS DONT HAVE ANY SERVICES DUE BEFORE 
        //TODO GETBYAVALIABILITY NEEDS TO MAKE SURE NONE OF THE CARS ARE NOT LATE
    static async getByAvaliability() {
        try {
            let dbResult = await pool.query("Select * from car inner join carstate on carstate_id = car_carstate_id where carstate_state = 'available' ");
            let dbCars = dbResult.rows;
            let cars = [];
            for(let car of dbCars){
                let ca = new Car();
                ca.id = car.car_id;
                ca.brand = car.car_brand;
                ca.model = car.car_model;
                ca.year = car.car_year;
                ca.rent = car.car_priceday;
                let dbImages = await pool.query("Select * from carimage where carimage_car_id = $1",[car.car_id]);
                ca.image = dbImages.rows[0].carimage_link;
                cars.push(ca);
            }
            return{ status:200, result:cars};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getBySearch(start_date, return_date) {
        try {
            if(!start_date instanceof Date && !return_date instanceof Date){
                return{status:500, result: "invalid date"}
            }
            let start = new Date(start_date);
            let finish = new Date(return_date);
            start_date = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
            return_date =  finish.getFullYear()+"-"+finish.getMonth()+"-"+finish.getDate();
            let dbResult = await pool.query("Select * from rent where rent_rentstate_id = 1 or rent_rentstate_id =2");
            let dbrents = dbResult.rows;
            let dbcars = [];
            if(dbrents.length){
                let dbResult = await pool.query(`
                        select * from car where car_id in (
                            select carservices_car_id from carservices
                                where carservices_due > $2
                                group by carservices_car_id) and car_carstate_id = 1 
                                
                        intersect 	
                            select * from car 
                                except(
                                    select * from car where car_id in (
                                        select rent_car_id from rent 
                                                where 
                                                $1 <= rent_data_inicio and rent_data_inicio <= $2 or
                                                $1 <= rent_data_final and rent_data_final <= $2 or
                                                rent_data_inicio <=$1 and $2 <= rent_data_final))`,[start_date, return_date]);
                dbcars = dbResult.rows;
                console.log(start_date, return_date);

            }else{
                let dbResult = await pool.query("Select * from car where car_carstate_id = 1");
                dbcars = dbResult.rows;
            }
            if(!dbcars.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "cars",
                        msg: "No cars in database"
                    }]
                }
            let cars = [];
                for(let car of dbcars){
                    let ca = new Car();
                    ca.id = car.car_id;
                    ca.brand = car.car_brand;
                    ca.model = car.car_model;
                    ca.year = car.car_year;
                    ca.rent = car.car_priceday;
                    let dbImages = await pool.query("Select * from carimage where carimage_car_id = $1",[car.car_id]);
                    ca.image = dbImages.rows[0].carimage_link;
                    cars.push(ca);
                }
            return{ status:200, result:cars};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async getByLicensePlate(licenseplate) {
        try {
            let dbResult = await pool.query("Select * from car where car_licenseplate=$1", [licenseplate]);
            let dbCars = dbResult.rows;
            if (!dbCars.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "LicensePlate",
                        msg: "This car doesnt exist"
                    }]
                }
            
            return { status: 200, dbCars: car} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    //! DELETE CAR SERVICES
    static async DeleteCar(LicensePlate, usr_id) {
        try {
            let dbResult = await pool.query("Select * from car where car_licenseplate=$1", [LicensePlate]);
            
            let dbCars = dbResult.rows[0];
            if(dbCars.car_usr_id != usr_id)
                return {
                    status: 400, result: [{
                        location: "body", param: "UserID",
                        msg: "This car does not belong to this user"
                    }]
                }
            
            if (dbCars == null)
                return {
                    status: 400, result: [{
                        location: "body", param: "LicensePlate",
                        msg: "This car doesnt exist"
                    }]
                }
            let Result2 = await pool.query("Delete from carservices carservices where carservices_car_id = $1", [dbCars.car_id]);
            let Result1 = await pool.query("Delete from carimage carimage where carimage_car_id = $1", [dbCars.car_id]);
            let Result = await pool.query("Delete from car where car_id =$1", [dbCars.car_id]);
            return { status: 200} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    //Add a car
    static async addCar(usr_id,car) {
        try{
            //! verify if the user is the correct user type
            let result = await User.getById(usr_id);
            let user = result.result;
            console.log(car);
            if(user.type != 2){
                return {
                    status: 400,
                    result: {
                        location: "auth", 
                        param: "type",
                        msg: "User type is not correct"
                    }
                }
            }
            if(car == null){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "car",
                        msg: "There is no car to add"
                    }       
                }
            }   
            let dbResult = await pool.query("Select * from car where car_licenseplate=$1 ", [car.license]);
            if(dbResult.rows.length){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "This car is already registered"
                    }
                }
            }
            if(!/^([A-Z]{2}-\d{2}-\d{2}|[A-Z]{2}-\d{2}-[A-Z]{2}|\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2})$/.test(car.license)){
                console.log("invalid license plate");
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The license plate is not correct"
                    }
                }
            }
            if(car.brand == null || car.brand == ""){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The brand is not correct"
                    }
                }
            }
            if(car.model == null || car.model == ""){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The model is not correct"
                    }
                }
            }
            if(car.year == null || car.year == "" || !/^(19|20)\d{2}$/.test(car.year)){
            return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The year is not correct"
                    }
                }
            }
            if(car.bhp == null || car.bhp == "" ||!/^[0-9]{1,4}$/.test(car.bhp)){ 
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The horse power is not correct"
                    }
                }
            }
            if(car.engine == null || car.engine == ""){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The engine is not correct"
                    }
                }
            }
            if(car.fuel != "Petrol" && car.fuel != "Diesel" && car.fuel!= "Eletric" && car.fuel!= "Hidrogen"){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The fuel is not correct"
                    }
                }
            }
            if(!/^[0-9]{1}M|[0-9]{1}A$/.test(car.gearbox)){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The gearbox is not correct"
                    }
                }
            }
            if(car.drivetrain != "FWD" && car.drivetrain != "RWD" && car.drivetrain != "AWD" && car.drivetrain!= "4WD"){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The drivetrain is not correct"
                    }
                }
            }
            if(!/^[0-9]{1}$/.test(car.door_n)){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The number of doors is not correct"
                    }
                }
            }
            if(!/^[0-9]{1,2}$/.test(car.seat_n)){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The number of seats is not correct"
                    }
                }
            }
            if(!/^[0-9]{1,4}$/.test(car.bootcapacity)){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The boot capacity is not correct"
                    }
                }
            }
            if(!/^[0-9]{1,4}$/.test(car.priceday)){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The price day is not correct"
                    }
                }
            }
            if(!car.extras.length){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The extra equipment is not correct"
                    }
                }
            }
            //! VERIFY IF THE DATE IS NOT BEFORE TODAY OR BEFORE 15 Days FROM TODAY, AND NO LONGER THAN A YEAR FROM TODAY
            if(car.services.inspection == null || car.services.inspection == "" || car.services.insurance== null || car.services.insurance== ""){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The services is not correct"
                    }
                }
            }
            //!VERIFY LINK
            if(!car.images.length){
                return {
                    status: 400,
                    result: {
                        location: "body", 
                        param: "specs",
                        msg: "The images are not correct"
                    }
                }
            }
            car.extras = car.extras.join(";");
            
            //insert car into car table
            console.log(car.license, car.brand, car.model, car.year, car.bhp, car.engine, car.fuel, car.gearbox, car.drivetrain, car.door_n, car.seat_n, car.bootcapacity, car.extras, car.priceday,1, usr_id);
            dbResult = await pool.query(`
            INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
            VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING car_id`,
            [car.license, car.brand, car.model, car.year, car.bhp, car.engine, car.fuel, car.gearbox, car.drivetrain, car.door_n, car.seat_n, car.bootcapacity, car.extras, car.priceday,1, usr_id]);
            let car_id = dbResult.rows[0].car_id;
            //insert car images into carimages table
            for(let image of car.images){
                dbResult = await pool.query(`
                INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ($1,$2);`,
                [image, car_id]);
            }
            //insert car services into carservices table
            dbResult = await pool.query(`
            INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection',$2,$1);`,
            [car_id,car.services.inspection]);
            dbResult = await pool.query(`
            INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance',$2,$1);`,
            [car_id,car.services.insurance]);
            return{status:200}
            
        }catch(err){
            console.log(err);
            return { status: 500, result: err };
        }
    }

}
module.exports = Car;
