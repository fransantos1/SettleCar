const express = require('express');
const router = express.Router();
const Car = require("../models/carModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");

router.get('/auth',auth.verifyAuth,  async function (req, res,next) {
    try {
        let result = await Car.getCars(req.user.id);
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

/*
router.get('',  async function (req, res) {
    try {
        let result = await car.getById(req.user.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let user = new User();

        user.name = result.result.name;
        user.phone = result.result.phone;
        user.email = result.result.email;
        user.type = result.result.type;
        res.status(result.status).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});*/
module.exports = router;
