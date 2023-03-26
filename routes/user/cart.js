const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getCart, makeCart, updateCart, deleteCart } = require("../../controllers/user/cart")
const router = express.Router();
/*
GET /cart/
*/
router.get('/', isLoggedIn, getCart);

/*
POST /cart
{
  boriGoods: [
    {
      bori_goods_id: ~~~
      bori_goods_count: ~~~
    }
  ]
}
*/
router.post('/', isLoggedIn, makeCart);

/*
PATCH /cart
{
  cart_id: ~~~,
  bori_goods_count: ~~~
}
*/
router.patch('/', isLoggedIn, updateCart);

/*
DELETE /cart
{
  cart_id: ~~~
}
*/
router.delete('/:cart_id', isLoggedIn, deleteCart);

module.exports = router;