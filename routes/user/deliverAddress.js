const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { updateDeliverAddress, getDeliverAddress } = require("../../controllers/user/deliverAddress")
const router = express.Router();

// PATCH /deliver-address
router.patch('/', isLoggedIn, updateDeliverAddress);


// GET /deliver-address/:user_id
router.get('/:user_id', isLoggedIn, getDeliverAddress);

module.exports = router;