const express = require('express');
const router = express.Router();
const Rent = require("../models/rentModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");

router.post('/auth',auth.verifyAuth,  async function (req, res,next) {
    try {
       
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

module.exports = router;