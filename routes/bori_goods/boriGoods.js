const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getBoriGoods, getBoriGoodsById, makeBoriGoods, likeBoriGoods, dislikeBoriGoods } = require("../../controllers/bori_goods/boriGoods")
const router = express.Router();
const { boriGoodsUpload } = require("../../utils/uploadImage")

//GET /bori_goods
router.get('/', getBoriGoods);

//GET /bori_goods/:bori_goods_id
router.get('/:bori_goods_id', getBoriGoodsById);

/*
POST /bori_goods
{
  category_id: ~~~,
  boriGoods: {
    bori_goods_name: ~~~,
    bori_goods_price: ~~~,
    bori_goods_stock: ~~~,
    bori_goods_desc: ~~~,
    bori_goods_image: ~~~
  }
}
*/
router.post('/', isLoggedIn, boriGoodsUpload.single('bori_goods_images'), makeBoriGoods);

/*
PATCH /bori_goods/like
{
  bori_goods_id: ~~~
}
*/
router.patch('/like', isLoggedIn, likeBoriGoods);

/*
PATCH /bori_goods/dislike
{
  bori_goods_id: ~~~
}
*/
router.patch('/dislike', isLoggedIn, dislikeBoriGoods);

module.exports = router;