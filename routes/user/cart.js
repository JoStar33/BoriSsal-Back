const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getCart, makeCart, modifyCart, deleteCart } = require("../../controllers/user/cart")
const router = express.Router();
/*
GET /cart/:user_id
*/
router.get('/:user_id', isLoggedIn, getCart);

/*
POST /cart
{
  user_id: ~~,
  product: [
    {
      product_id: ~~~
      product_count: ~~~
    }
  ]
}
*/
router.post('/', isLoggedIn, makeCart);

/*
PATCH /cart
{
  cart_id: ~~~,
  product_count: ~~~
}
*/
router.patch('/', isLoggedIn, modifyCart);

/*
DELETE /cart
{
  cart_id: ~~~
}
*/
router.delete('/', isLoggedIn, deleteCart);

module.exports = router;