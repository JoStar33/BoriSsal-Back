const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { updateDeliverAddress } = require("../../controllers/user/deliverAddress")
const router = express.Router();

// PATCH /deliver-address
router.patch('/', isLoggedIn, updateDeliverAddress);

module.exports = router;