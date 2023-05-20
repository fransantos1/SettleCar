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

//! NEED TO VERIFY IF THE CAR HAS ACTIVE RENTS AND WARN THE OWNER BEFORE DELETING AND CAN ONLY DELETE IF THE CAR IS available or unavailable at the time
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
module.exports = router;
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
module.exports = router;
