const express = require("express");
const { getProductReply, makeProductReply, makeProductChildReply, updateProductReply, 
  updateProductChildReply, deleteProductReply, deleteProductChildReply } = require("../../controllers/product/productReply")
const router = express.Router();
// GET /:product_id
router.get('/:product_id', getProductReply);

/*
POST /product-reply
  {
    user_id: ~~~,
    product_id: ~~~,
    content: ~~~
  }
*/
router.post('/', makeProductReply);

/*
POST /product-reply/child
  {
    reply_id: ~~~,
    user_id: ~~~,
    content: ~~~
  }
*/
router.post('/child', makeProductChildReply);

/*
PATCH /product-reply
  {
    reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/', updateProductReply);

/*
PATCH /product-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/child', updateProductChildReply);

/*
DELETE /product-reply
  {
    reply_id: ~~~
  }
*/
router.delete('/', deleteProductReply);

/*
DELETE /product-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~
  }
*/
router.delete('/child', deleteProductChildReply);


module.exports = router;