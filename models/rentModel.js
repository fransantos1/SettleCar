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


    //criar rente
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

    static async createRent(user, rent){
        try{
        let occupied = await User.isOccupied(user.id);
        if (occupied){
            return{status: 400, result:{ "msg": "This user has already a rent planned"}}
        }
        //insert rent into database
        //! calculate rent price here
        let car = await Car.getByid(rent.car);
        let days; //calculate days between end and beginning
        rent.price = days*car.price_day;

        let dbResult = await pool.query(`insert into rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_price, rent_status_id)
            values ($1, $2, $3, $4, $5, 1)`, [rent.beginning, rent.end,rent.car,user.id, rent.price]);
        }catch(err){
            console.log(err);
            return{status: 500, result: err}
        }
    }
    static async RentChangeState(state_id){

    }
    static async deleteRent(){}


    static async getRentsFromCar(carId) {
        try {
            let dbResult = await pool.query(`select rent_id, rent_data_inicio::date, rent_data_final::date, usr_name, 
             rent_usr_id, rent_price,rent_penalty, rent_rentstate_id from rent inner join usr on usr_id = rent_usr_id where rent_car_id = $1 and rent_rentstate_id = 3`, [carId]);
            let dbRents = dbResult.rows;
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

    static async getRentsFromUser(userId) {
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

module.exports = Rent;