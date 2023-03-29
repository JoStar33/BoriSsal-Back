const express = require("express");
const { getOrder, getAllOrderForSearch, getOrderById, deleteOrder, updateOrderStatus, makeOrder } = require("../../controllers/order/order");
const router = express.Router();

//GET /order/
router.get('/', getOrder);

router.get('/:limit', getAllOrderForSearch);

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
PATCH /order
  {
    order_id: ~~~,
    order_status: ~~~
  }
*/
router.patch('/', updateOrderStatus)
/*
POST /order
  [
    order_id: ~
  ]
*/
router.delete('/:order_id', deleteOrder);


module.exports = router;