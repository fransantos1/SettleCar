const pool = require("../config/database");
const auth = require("../config/utils");


function dbCartocar(db){
    return new Car(db.car_id,db.car_licenseplate, db.car_brand, db.car_model,db.car_year,db.car_bhp, db.car_engine, db.car_fuel,db.car_gearbox, db.car_drivetrain, db.car_doors, db.car_seats,db.car_bootcapacity,db.car_equi_ext, db.car_priceday,db.carstate_state,db.car_usr_id);
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
    static async getImages(carid){
        try {
                
                return { status: 200, result: images} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
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

    

    static async ChangecarState(carid,stateid) {
        try {
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
            let Result1 = await pool.query("Delete from carimage carimage where carimage_car_id = $1", [dbCars.car_id]);
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
