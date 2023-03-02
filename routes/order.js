const express = require("express");
const { getOrder, getOrderById, makeOrder } = require("../controllers/order")
const router = express.Router();

//POST /order 상품 ID와 유저 정보, 주문 정보를 보냄.
router.post('/', makeOrder);