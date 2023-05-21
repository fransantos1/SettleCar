const pool = require("../config/database");
const auth = require("../config/utils");
const User = require("../models/usersModel");
const Car = require("../models/carModel");









class Rent{
    constructor(id, beginning, end, car, usr, rent_state,price){
        this.id = id;
        this.beginning = beginning;
        this.end = end;
        this.car = car;
        this.usr = usr;
        this.rent_state = rent_state;
        this.price = price;
    }

    static async createRent(user, rent){
        try{
            //Verify if the user has any other rent
            let occupied = await User.isOccupied(user.id);
            if (occupied.result.occupied){
                return{status: 400, result:{ "msg": "This user has already a rent planned"}}
            }
            //Verify if the car is available
            let result = await Car.getByid(rent.car);
            let car = result.result;
            if(car.state != "available"){
                return {
                    status: 500, result: [{
                        msg: "something went wrong"
                    }]
                }
            }
            let start_date = rent.beginning.getFullYear()+"-"+(rent.beginning.getMonth()+1)+"-"+rent.beginning.getDate();
            let return_date =  rent.end.getFullYear()+"-"+(rent.end.getMonth()+1)+"-"+rent.end.getDate();
            console.log(start_date, return_date);
            //verify if the car is available at that date
            let available_cars = await pool.query(`
            select * from car where car_id in (
                select carservices_car_id from carservices
                    where carservices_due > $2
                    group by carservices_car_id) and car_carstate_id != 4 and car_id = $3
                    
            intersect 	
                select * from car 
                    except(
                        select * from car where car_id in (
                            select rent_car_id from rent 
                                    where 
                                    $1 <= rent_data_inicio and rent_data_inicio <= $2 or
                                    $1 <= rent_data_final and rent_data_final <= $2 or
                                    rent_data_inicio <=$1 and $2 <= rent_data_final))`,[start_date, return_date,rent.car]);
            if(!available_cars.rows.length){
                return {
                    status: 400, result: [{
                        msg: "This car isnt available for this date"
                    }]
                }
            }
            let difference = new Date(rent.end).getTime() - new Date(rent.beginning).getTime();
            let days = Math.ceil(difference / (1000 * 3600 * 24));
            rent.price = "("+days*car.price+"€)";
            let dbResult = await pool.query(`insert into rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_price, rent_rentstate_id)
                values ($1, $2, $3, $4,$5, 1)`, [start_date, return_date,rent.car,user.id, rent.price]); 

            return {status:200, result:{"msg":"Rent registered successfully"}};
        }catch(err){
            console.log(err);
            return{status: 500, result: err}
        }

    }
    //update da localização do carro
    // acabar rent
    static async getRentCourse_owner(rentId, date,usr){
    //verifications
    try{
      if(usr.type != 2){
        return {
            status: 401, result: [{
                location: "usr", param: "type",
                msg: "Wrong user type"
            }]
        }
    }
    let geojson = {
        "type": "FeatureCollection",
        "features": [
            ]
    };
    let result = {};

    //route info 
    let geojsno_feature =  {
        "type": "Feature",
        "properties": {},
        "geometry": {}
        }
        // ROUTE 
    let dbResult = await pool.query(`
        SELECT ST_asGEOJSOn(ST_Makeline(
            ARRAY(select rr_geom::geometry from rentroute
                    where rr_rent_id = $1 and rr_time::date = $2 
                    order by rr_time)));`, [rentId, date]);
        let dbcourse = dbResult.rows;
        if (dbcourse[0].st_asgeojson == null) {
            return {
                status: 204
            }
        }
        geojsno_feature.geometry = JSON.parse(dbcourse[0].st_asgeojson);
        geojsno_feature.properties.type = "route_line";
        geojson.features.push(geojsno_feature);
    
    
        //Points
        geojsno_feature = {
            "type": "Feature",
            "properties": {},
            "geometry": {}
        }
        dbResult = await pool.query(`
        select st_asGeojson(rr_geom) ,rr_time::time from rentroute
                        where rr_rent_id = $1 and rr_time::date = $2;`, [rentId, date]);
        dbcourse = dbResult.rows;
        if (!dbcourse.length){
            return {
                status: 500, result: [{
                    location: "body", param: "rents",
                    msg: "This rent has no registered course"
                }]
            }
        }//shoplists = result.result.map((sl)=> sl.export());
        for(let point of dbcourse){
            geojsno_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            geojsno_feature.geometry = JSON.parse(point.st_asgeojson);
            geojsno_feature.properties.time = point.rr_time;
            geojsno_feature.properties.type = "route_point";
            geojson.features.push(geojsno_feature);
        }

    //Restrictions

    //map
    geojsno_feature =  {
        "type": "Feature",
        "properties": {},
        "geometry": {}
    }
    dbResult = await pool.query(`select st_asgeojson(am_geom) From allowed_map`);
    let allowed_map = dbResult.rows;
    if (!allowed_map.length){
        return {
            status: 400, result: [{
                location: "body", param: "rents",
                msg: "error"
            }]
        }
    }
    geojsno_feature.geometry = JSON.parse(allowed_map[0].st_asgeojson);
    geojsno_feature.properties.type = "allowed_map";
    geojson.features.push(geojsno_feature);

    //no parking area

    dbResult = await pool.query(`select st_asgeojson(st_buffer(ns_geom,4)) from no_stopzones`);
    let no_parking = dbResult.rows;
    if (!no_parking.length){
        return {
            status: 400, result: [{
                location: "body", param: "rents",
                msg: "error"
            }]
        }
    }
     for(let parking of no_parking){
        geojsno_feature = {
            "type": "Feature",
            "properties": {},
            "geometry": {}
        }
        geojsno_feature.geometry = JSON.parse(parking.st_asgeojson);
        geojsno_feature.properties.type = "no_parking";
        geojson.features.push(geojsno_feature);
    }
    result.geojson = geojson;
    return {
            status: 200, result: result
    }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
    }
    static async insert_point(){
        
    }

    //Verify rent
    static async verifyRent(rentid){
        try{
            let infractions = 0;
            //VERIFY IF PARKED
            let dbResult = await pool.query("select rr_id, rr_time from rentroute where rr_rent_id = $1 order by rr_time;",[rentid]);
            let rows = dbResult.rows;
            if(!rows.length){
                return {
                    status: 400, result: [{
                        location: "body", param: "rent",
                        msg: "there are no routes to verify"
                    }]
                }
            }
            let old_date = new Date(rows[0].rr_time);
            for(let row of rows){
                let date = new Date(row.rr_time);
                //compare if it passed 10 minutes between points
                if(((date.getTime() - old_date.getTime())/1000)/60 > 10){
                    //verify if its parked wrong
                    let dbResults = await pool.query(`
                    select ST_Within(rr_geom::geometry, st_buffer(ns_geom,4.5)::geometry)
                        from rentroute, no_stopzones where rr_id = $1
                            group by st_within`,[row.rr_id]);
                    let intersections = dbResults.rows;
                    for(let intersection of intersections){
                        if(!intersection.st_within){continue;}
                        infractions += 50;
                        //!  MAKE THIS POINT A INFRACTION TO SHOW RED ON GOOGLE MAP
                        break;
                    }
                }
                old_date = date;
            }
            //TODO BETTER METHOD
            dbResult = await pool.query(`select st_intersects(
                        (SELECT ST_Makeline(ARRAY(select rr_geom::geometry from rentroute where rr_rent_id = $1
                            order by rr_time))), 
                            (select am_geom from allowed_map))`,[rentid]);
            let row = dbResult.rows[0];
            if(row.st_intersects){
                infractions += 200;
            }
            if(infractions > 0){
                dbResult = await pool.query(`update rent set rent_penalty = $1 where rent_id = $2`,[infractions, rentid]);
                return {status:200,result:{"msg": "User has to pay an addicionl "+infractions}};
            }
            return {status:200, result:{"msg":"No penaltys found"}};
        }catch(err){
            console.log(err);
            return { status: 500, result: err };
        }
    }

    
    //this will compare the current time to the time in the rent and changes the state depending on that
    static async UpdateRents(rent_id){

    }
    static async deleteRent(){}

    static async getscheduledRentsfromcar(carid) {
        try {
            let dbResult = await pool.query("select * From rent where rent_car_id = $1 and rent_rentstate_id = 1", [carid]);
            let dbRents = dbResult.rows;
            if (!dbRents.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "rents",
                        msg: "This car has no registered rents"
                    }]
                }
            let rents = [];
            for (let dbRent of dbRents) {
                let rent = new Rent();
                rent.id = dbRent.rent_id;
                rent.beginning = dbRent.rent_data_inicio;
                rent.end = dbRent.rent_data_final;
                rent.usr = dbRent.usr_name;
                rent.price = dbRent.rent_price+"+"+dbRent.rent_penalty;
                rents.push(rent);           
            }
            return { status: 200, result: rents} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }





    static async getRentsHistoryFromCar(carId) {
        try {
            let dbResult = await pool.query(`select rent_id, rent_data_inicio::date, rent_data_final::date, usr_name, 
             rent_usr_id, rent_price,rent_penalty, rent_rentstate_id from rent inner join usr on usr_id = rent_usr_id where rent_car_id = $1 and rent_rentstate_id = 3`, [carId]);
            let dbRents = dbResult.rows;
            console.log(dbRents);
            if (!dbRents.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "rents",
                        msg: "This car has no registered rents"
                    }]
                }
            let rents = [];
            for (let dbRent of dbRents){
                let rent = new Rent();
                rent.id = dbRent.rent_id;
                rent.beginning = dbRent.rent_data_inicio;
                rent.end = dbRent.rent_data_final;
                rent.usr = dbRent.usr_name;
                rent.price = dbRent.rent_price+"+"+dbRent.rent_penalty;
                rents.push(rent);             
            }
            return { status: 200, result: rents} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getRentsHistoryFromUser(userId) {
        try {
            let dbResult = await pool.query("SELECT * FROM rent INNER JOIN users ON rent_user_id = users_id WHERE rent_user_id=$1", [userId]);
            let dbRents = dbResult.rows;
            if (!dbCars.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "rents",
                        msg: "This user has no registered rents"
                    }]
                }
            let rents = [];
            for (let dbRent of dbRents) {
                let rent = dbRentToObjRent(dbRent);
                rents.push(rent);             
            }
            return { status: 200, result: rents} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async getScheduledRent(userId) {
        try {
            let dbResult = await pool.query(`select * from rent inner join car on rent_car_id = car_id inner join rentstate on rent_rentstate_id = rentstate_id
                                            where rent_rentstate_id != 3
                                            and rent_usr_id = $1`, [userId]);                                            
            let dbRent = dbResult.rows[0];
            if (!dbRent)
                return {
                    status: 404, result: [{
                        msg: "Something went wrong"
                    }]
                }
            let rent = {};
            rent.vehicle = dbRent.car_brand + " "+ dbRent.car_model + " (" +dbRent.car_year+")";
            rent.id = dbRent.rent_id;
            rent.start_date = dbRent.rent_data_inicio;
            rent.end_date = dbRent.rent_data_final;
            rent.price = dbRent.rent_price;
            rent.status = dbRent.rentstate_state;
            return { status: 200, result: rent} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}

module.exports = Rent;