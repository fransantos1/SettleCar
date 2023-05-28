const pool = require("../config/database");
const auth = require("../config/utils");
const User = require("../models/usersModel");

function dbCartocar(db){
    let car = new Car();
    car.id = db.car_id;
    car.licenseplate = db.car_licenseplate;
    car.brand = db.car_brand;
    car.model = db.car_model;
    car.year = db.car_year;
    car.bhp = db.car_bhp;
    car.engine = db.car_engine;
    car.fuel = db.car_fuel;
    car.gearbox = db.car_gearbox;
    car.drivetrain = db.car_drivetrain;
    car.doors = db.car_doors;
    car.seats = db.car_seats;
    car.bootcapacity = db.car_bootcapacity;
    car.extra_equipment = db.car_equi_ext;
    car.price = db.car_priceday;
    car.state = db.carstate_state;
    car.user_id = db.car_usr_id;
    return car;
}


class Car{
    constructor(id, licenseplate, brand, model,year,bhp, engine, fuel, gearbox, drivetrain, doors, seats, bootcapacity, extra_equipment, price, state, user_id) {
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
        this.price = price;
        this.state = state;
        this.user_id = user_id;
    }
    // verificar se a data nova é depois da data antiga 
// verificar se a data nova é um ano depois da data atual
static async updadeService(userid, carid, service) {
    try { 
        console.log(service.name);
        if (service.name != "inspection" && service.name != "insurance") // verifica se o valor que cliente quer é valido, so pode ser insp ou insu
            return {
                status: 400, result: [{
                    location: "body", param: "service name",
                    msg: "Service name not valid"
                }]
            }
        let dbResult = await pool.query("select * from car where car_id = $1", [carid]); 
        let dbservices = dbResult.rows[0];

        if (userid != dbservices.car_usr_id) // verifica o id do dono carro corresponde ao id do utilizador a que pertence o carro
            return {
                status: 400, result: [{
                    location: "body", param: "userid",
                    msg: "Car does not belong to user"
                }]
            }
        dbResult = await pool.query("select * from carservices where carservices_car_id = $1 and carservices_type = $2", [carid, service.name]); //verificando o id da linha que o cliente quer mudar
        console.log(carid);
        dbservices = dbResult.rows[0];
        service.date = new Date(service.date);
        let date = service.date.getFullYear()+"-"+(service.date.getMonth()+1)+"-"+service.date.getDate(); //converte a data para inserir no postgres
        console.log(dbservices);
        dbResult = await pool.query("update carservices set carservices_due = $1 where carservices_id = $2",[date, dbservices.carservices_id]);
        return {
            status:200, msg: "Car service updated successfully"
        }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
} 

    static async updateLoc(carid, location){
        try{
            if(!carid || !location){
                return {
                    status: 400, result: [{
                        msg: "Params Missing"
                    }]
                }
            }
            //verify if the car is in a rent
            let dbresult = await pool.query("select * from rent where rent_car_id = $1 and rent_rentstate_id = 2",[carid]);
            let dbrows = dbresult.rows[0];
            //if yes update the car_loc table and, insert a new point on the rent_route table
            //if no update only the car_loc table
            let loc = "SRID=4326;POINT("+location.lon+" "+location.lat+")";
            //! I Wanted to call a Rent function but javascript doesnt let me cause, it creates a "loop"
            if(!dbrows){
                let dbResult = await pool.query(`INSERT INTO rentroute (rr_geom,rr_time, rr_rent_id) VALUES  
                (ST_GeographyFromText($1),now()::timestamp(0),
                 $2);`,[loc, dbrows.rent_id])
            }
            dbresult = await pool.query("update carloc set cl_geom = $1 where cl_car_id = $2",[loc, carid]);            
            return { status: 200, msg: "updated successfully" };
        }catch(err){
            console.log(err);
            return { status: 500, result: err };
        }
    }


    //TODO MAKE UNAVAILABLE
    static async getByid(carid) {
        try{
            let dbResult = await pool.query("select * from car inner join carstate on car_carstate_id = carstate_id where car_id = $1", [carid]);
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
    static async getByAvaliability() {
        try {
            let dbResult = await pool.query("Select * from car inner join carstate on carstate_id = car_carstate_id where carstate_state != 'unavailable' ");
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
            start_date = start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate();
            return_date =  finish.getFullYear()+"-"+(finish.getMonth()+1)+"-"+finish.getDate();
            console.log(start_date);
            let dbResult = await pool.query("Select * from rent where rent_rentstate_id = 1 or rent_rentstate_id =2");
            let dbrents = dbResult.rows;

            let dbcars = [];dbResult = await pool.query(`
                        select * from car where car_id in (
                            select carservices_car_id from carservices
                                where carservices_due > $2
                                group by carservices_car_id) and car_carstate_id != 4
                                
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

      
            if(!dbcars.length)
                return {
                    status: 204, result: [{
                        msg: "No cars available"
                    }]
                }
            
            let difference = new Date(return_date).getTime() - new Date(start_date).getTime();
            let days = Math.ceil(difference / (1000 * 3600 * 24));
            
                console.log(days);
            let cars = [];
                for(let car of dbcars){
                    let ca = new Car();
                    ca.id = car.car_id;
                    ca.brand = car.car_brand;
                    ca.model = car.car_model;
                    ca.year = car.car_year;
                    ca.rent = car.car_priceday*days;
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
    //! this feature is not working at the moment because of spatial tables on data base
    //just deletes everything about that car
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

            //TODO when this error occurs the car should be made unavailable.
            //verify if the car is in a current rent
            dbResult = await pool.query("select exists(select * from rent where rent_car_id = $1 and rent_rentstate_id = 2)",[dbCars.car_id]);
            if(dbResult.rows[0].exists){  
                return {
                    status: 409, result: [{
                        msg: "Car is in a rent and can't be removed"
                    }]
                }

            }
            //verify if it has any scheduled rents
            dbResult = await pool.query("select * from rent where rent_car_id = $1 and rent_rentstate_id = 1",[dbCars.car_id]);
            let dbRent = dbResult.rows;
            if(dbRent.length){
                User.putNotifications(dbRent[0].rent_usr_id, 'Your rent was cancelled due to the car being deleted');
            }

            //verifies if it has old rents and deletes de routes associated with them
            dbResult = await pool.query("select * from rent where rent_car_id = $1 and rent_rentstate_id = 3",[dbCars.car_id]);
            dbRent = dbResult.rows;
            if(dbRent.length){
                let result = await pool.query("delete from rentroute where rr_rent_id = $1",[dbRent[0].rent_id]);
            }
            let result4 = await pool.query("delete from carloc where cl_car_id = $1",[dbCars.car_id]);
            let result3 = await pool.query("delete from rent where rent_car_id = $1",[dbCars.car_id]);
            let Result2 = await pool.query("Delete from carservices carservices where carservices_car_id = $1", [dbCars.car_id]);
            let Result1 = await pool.query("Delete from carimage carimage where carimage_car_id = $1", [dbCars.car_id]);
            let Result = await pool.query("delete from car where car_id = $1", [dbCars.car_id]);
            return { status: 200, result: [{
                msg: "Car removed successfully"
            }]};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async get_caravaliability(carid){
        try{
            let dbResults = await pool.query("select * from carservices where carservices_car_id = $1", [carid]);
            let response = dbResults.rows;
            if(!response.length){
                return {
                    status: 500
                }
            }
            let max = response[0].carservices_due;// this max means that is the maximum date the car can be rented, so we are going to get the closest date 
            for(let service of response){
                if(service.carservices_due < max ){
                max = service.carservices_due;
                } 
            }
            let result = {};
            let dbResult = await pool.query("select * From rent where rent_car_id = $1 and rent_rentstate_id = 1", [carid]);
            let dbRents = dbResult.rows;
            let rents = [];
            for (let dbRent of dbRents) {
                let rent = {};
                rent.beginning = dbRent.rent_data_inicio;
                rent.end = dbRent.rent_data_final;
                rents.push(rent);           
            }
        
            result.rents = rents;
            result.max = max;
            return { status: 200, result: result};
        }catch(err){
            console.log(err);
            return { status: 500, result:err};
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
            //todo VERIFY IF THE DATE IS NOT BEFORE TODAY OR BEFORE 15 Days FROM TODAY, AND NO LONGER THAN A YEAR FROM TODAY
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
            //todo VERIFY LINK
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
            dbResult = await pool.query(`insert into carloc(cl_geom, cl_car_id) values ('SRID=4326;POINT(0 0)', $1)`,[car_id]);
            return{status:200, result:{msg:"car added successfully"}} 
        }catch(err){
            console.log(err);
            return { status: 500, result: err };
        }
    }

}
module.exports = Car;
