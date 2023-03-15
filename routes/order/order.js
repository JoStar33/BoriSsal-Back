const express = require("express");
const { getOrder, getOrderById, deleteOrder, makeOrder } = require("../../controllers/order/order");
const router = express.Router();

//GET /order/:user_id
router.get('/:user_id', getOrder);


//GET /order/order-detail/:user_id
router.get('/order-detail/:order_id', getOrderById);

/*
POST /order
  [
    user_id: ~,
    products: [
      {
        product_id: ~,
        product_count: ~,
        product_price: ~
      }
    ],
  ]
*/
router.post('/', makeOrder);

/*
POST /order
  [
    user_id: ~,
    order_id: ~
  ]
*/
router.delete('/', deleteOrder);


module.exports = router;