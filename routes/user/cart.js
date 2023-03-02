const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getCart, makeCart, modifyCart, deleteCart } = require("../../controllers/user/cart")
const router = express.Router();
/*
GET /:user_id
*/
router.get('/:user_id', isLoggedIn, getCart);

/*
POST /
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
PATCH /
{
  cart_id: ~~~,
  product_count: ~~~
}
*/
router.patch('/', isLoggedIn, modifyCart);

/*
DELETE /
{
  cart_id: ~~~
}
*/
router.delete('/', isLoggedIn, deleteCart);

module.exports = router;