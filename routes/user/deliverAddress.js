const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { updateDeliverAddress, getDeliverAddress } = require("../../controllers/user/deliverAddress")
const router = express.Router();

// PATCH /deliver-address
router.patch('/', isLoggedIn, updateDeliverAddress);


// GET /deliver-address/
router.get('/', isLoggedIn, getDeliverAddress);

module.exports = router;