const express = require('express');
const router = express.Router();
const Rent = require("../models/rentModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");

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

router.get('/auth/fromCar/:carid',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getRentsFromCar(req.params.carid);
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
router.get('/fromUser/:userid',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await Rent.getRentsFromCar(req.user.id);
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