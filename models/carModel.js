const pool = require("../config/database");
const auth = require("../config/utils");


class car{
    constructor(id, licenseplate, brand, model, engine, fuel, gearbox, drivetrain, doors, seats, bootcapacity, extra_equipment, price_day, car_state, car_user_id) {
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
        this.car_user_id = car_user_id;
    }






}
