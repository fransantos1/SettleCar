const express = require('express');
const router = express.Router();
const Rent = require("../models/rentModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");


//Posts a rent
router.post('/auth',auth.verifyAuth, async function (req, res, next) {
    try {
        let rent = new Rent();

        rent.beginning = new Date(req.body.beginning);
        rent.end = new Date(req.body.end);
        rent.car = req.body.car;

        let result = await Rent.createRent(req.user, rent);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//returns the scheduled rent or the last rent made
router.get('/auth/getScheduled/',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getScheduledRent(req.user.id);
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
//cancel a Rent
router.delete('/auth/delete/',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.CancelRent(req.body.rentid);
        if (result.status != 200) {
            res.status(result.status).send(result);
            return;
        }
        res.status(result.status).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//returns the course made on a rent can only be used by the owner
router.get('/auth/getCourseOwner/:rentId/:date',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getRentCourse_owner(req.params.rentId, req.params.date,req.user);
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
//returns rent history from a car
router.get('/auth/history/fromCar/:carid',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getRentsHistoryFromCar(req.params.carid);
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
//returns rent history from a usr
router.get('/auth/history/fromUser/',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getRentsHistoryFromUser(req.user.id);
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
//returns scheduled rent from Car
router.get('/auth/scheduled/fromCar/:carid',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getscheduledRentsfromcar(req.params.carid);
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
//verifies the rent course and sends an update to database
router.patch('/auth/verify',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.verifyRent(req.body.rentid);
        if (result.status != 200) {
            res.status(result.status).send();
            return;
        }
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;