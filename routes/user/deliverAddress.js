const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { modifyDeliverAddress } = require("../../controllers/user/deliverAddress")
const router = express.Router();

router.patch('/', isLoggedIn, modifyDeliverAddress);

module.exports = router;