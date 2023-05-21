const express = require('express');
const router = express.Router();
const Rent = require("../models/rentModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");



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