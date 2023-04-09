const pool = require("../config/database");
const auth = require("../config/utils");


function dbCartocar(db){
    return new Car(db.car_id,db.car_licenseplate, db.car_brand, db.car_model, db.car_engine, db.car_fuel,db.car_gearbox, db.car_drivetrain, db.car_doors, db.car_seats,db.car_bootcapacity,db.car_equi_ext, db.car_priceday,db.car_carstate_id,db.car_usr_id);
}
class repair{

}
class rent{
    constructor(id, beggining, end, car_id, usr_id, rent_state){
        this.id = id;
        this.beggining = beggining;
        this.end = end;
        this.car_id = car_id;
        this.usr_id = usr_id;
        this.rent_state = rent_state;
    }
}
class Car{
    constructor(id, licenseplate, brand, model, engine, fuel, gearbox, drivetrain, doors, seats, bootcapacity, extra_equipment, price_day, car_state, user_id) {
        this.id = id;
        this.licenseplate = licenseplate;
        this.brand = brand;
        this.model = model;
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
    static async getCars_owner(userid) {
        try {
            let dbResult = await pool.query("Select * from car where car_usr_id=$1", [userid]);
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
                let beforeImage = dbCartocar(dbCar);
                let dbImages = await pool.query("Select * from carimage where carimage_car_id=$1", [beforeImage.id]);
                let dbImage = dbImages.rows;
                let images = [];
                for(let imagee of dbImage){
                   images.push(imagee.carimage_link);
                }
                console.log(images);
                beforeImage.images = images;
                cars.push(beforeImage);                
            }
            return { status: 200, result: cars} ;
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

    static async DeleteCar(LicensePlate, usr_id) {
        try {
            let dbResult = await pool.query("Select * from car where car_licenseplate=$1", [LicensePlate]);
            
            let dbCars = dbResult.rows[0];
            console.log(dbCars.car_usr_id);
            console.log(usr_id);
            console.log(dbCars);
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
            let Result = await pool.query("Delete from car where car_licensePlate =$1", [LicensePlate]);
            console.log(Result);
            return { status: 200} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}
module.exports = Car;
