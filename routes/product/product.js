const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getProduct, getProductById, makeProduct, likeProduct, dislikeProduct } = require("../../controllers/product/product")
const router = express.Router();
const { productUpload } = require("../../utils/uploadImage")

//GET /product
router.get('/', getProduct);

//GET /product/:product_id
router.get('/:product_id', getProductById);

/*
POST /product
{
  category_id: ~~~,
  product: {
    product_name: ~~~,
    product_price: ~~~,
    product_stock: ~~~,
    product_desc: ~~~,
    product_image: ~~~
  }
}
*/
router.post('/', isLoggedIn, productUpload.single('img'), makeProduct);

/*
PATCH /product/like
{
  product_id: ~~~,
  user_id: ~~~
}
*/
router.patch('/like', isLoggedIn, likeProduct);

/*
PATCH /product/dislike
{
  product_id: ~~~,
  user_id: ~~~
}
*/
router.patch('/dislike', isLoggedIn, dislikeProduct);

module.exports = router;