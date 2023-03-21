const express = require("express");
const { getBoriGoodsReply, makeBoriGoodsReply, makeBoriGoodsChildReply, updateBoriGoodsReply, 
  updateBoriGoodsChildReply, deleteBoriGoodsReply, deleteBoriGoodsChildReply } = require("../../controllers/bori_goods/boriGoodsReply")
const router = express.Router();
// GET /:bori_goods_id/:limit
router.get('/:bori_goods_id/:limit', getBoriGoodsReply);

/*
POST /bori_goods-reply
  {
    user_id: ~~~,
    bori_goods_id: ~~~,
    content: ~~~
  }
*/
router.post('/', makeBoriGoodsReply);

/*
POST /bori_goods-reply/child
  {
    reply_id: ~~~,
    user_id: ~~~,
    content: ~~~
  }
*/
router.post('/child', makeBoriGoodsChildReply);

/*
PATCH /bori_goods-reply
  {
    reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/', updateBoriGoodsReply);

/*
PATCH /bori_goods-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/child', updateBoriGoodsChildReply);

/*
DELETE /bori_goods-reply
  {
    reply_id: ~~~
  }
*/
router.delete('/', deleteBoriGoodsReply);

/*
DELETE /bori_goods-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~
  }
*/
router.delete('/child', deleteBoriGoodsChildReply);


module.exports = router;