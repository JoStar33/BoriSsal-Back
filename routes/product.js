const express = require("express");
const { getProduct, getProductById, makeProduct } = require("../controllers/product")
const router = express.Router();

router.get('/', getProduct);

router.get('/:product_id', getProductById);

router.post('/', makeProduct);