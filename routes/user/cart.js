const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getCart, makeCart, updateCart, deleteCart } = require("../../controllers/user/cart")
const router = express.Router();
/*
GET /cart/:user_id
*/
router.get('/:user_id', isLoggedIn, getCart);

/*
POST /cart
{
  user_id: ~~,
  boriGoods: [
    {
      bori_goods_id: ~~~
      bori_goods_stock: ~~~
    }
  ]
}
*/
router.post('/', isLoggedIn, makeCart);

/*
PATCH /cart
{
  cart_id: ~~~,
  bori_goods_stock: ~~~
}
*/
router.patch('/', isLoggedIn, updateCart);

/*
DELETE /cart
{
  cart_id: ~~~
}
*/
router.delete('/', isLoggedIn, deleteCart);

module.exports = router;