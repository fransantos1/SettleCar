const express = require('express');
const router = express.Router();
const Car = require("../models/carModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");


//post a car
router.post('/auth',auth.verifyAuth,  async function (req, res,next) {
    try {
        let result = await Car.addCar(req.user.id, req.body.car);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//get owner's cars function
router.get('/auth',auth.verifyAuth,  async function (req, res,next) {
    try {
        let result = await Car.getCars_owner(req.user.id);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//returns info about the car avaliability for the calendar
router.get('/auth/avaliability/:carid' ,auth.verifyAuth,  async function (req, res,next) {
    try {
        let result = await Car.get_caravaliability(req.params.carid);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//GET all the info about the car (only Owner)
router.get('/auth/:carid',auth.verifyAuth,  async function (req, res,next) {
    try {
        let result = await Car.getCar_owner(req.user.id, req.params.carid);
        console.log(result);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//searches for the cars available in the dates
router.get('/search/:start_date/:return_date',  async function (req, res,next) {
    try {
        let result = await Car.getBySearch(req.params.start_date, req.params.return_date);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//deletes a car
router.delete('/auth', auth.verifyAuth, async function(req,res,next){
    try{
        let result = await Car.DeleteCar(req.body.licenseplate,req.user.id);
        console.log(result);
        if(result.status !== 200){
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//get information about a car, no authenthicatio required
router.get('/:id',  async function (req, res) {
    try {
        let result = await Car.getByid(req.params.id);
        result.result.licenseplate = "";
        result.result.car_state = "";
        result.result.user_id ="";
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//returns all the cars that are available
router.get('',  async function (req, res) {
    try {
        let result = await Car.getByAvaliability();
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        res.status(result.status).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//! a way to make this secure, has the car location will be updated by a exterior gps device, the car should have a sort of password or encrypted id.
router.patch('/updateloc/:carid',async function(req, res, next){
    try {
        let result = await Car.updateLoc(req.params.carid, req.body.loc);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        res.status(result.status).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.patch('/auth/updateservice/:carid', auth.verifyAuth, async function (req, res,next) {
    try {
        console.log(req.body.service);
        let result = await Car.updadeService(req.user.id, req.params.carid, req.body.service); //user id vem do utilizador que esta autenticado
        if (result.status != 200) {
            console.log(result);
            res.status(result.status).send(result.result);
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports = router;
