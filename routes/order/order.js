const express = require("express");
const { getOrder, getOrderById, deleteOrder, makeOrder } = require("../../controllers/order/order");
const router = express.Router();

//GET /order/
router.get('/', getOrder);


//GET /order/order-detail/
router.get('/order-detail/', getOrderById);
/*
POST /order
  [
    boriGoods: [
      {
        bori_goods_id: ~,
        bori_goods_count: ~,
        bori_goods_price: ~
      }
    ],
  ]
*/
router.post('/', makeOrder);

/*
POST /order
  [
    order_id: ~
  ]
*/
router.delete('/:order_id', deleteOrder);


module.exports = router;