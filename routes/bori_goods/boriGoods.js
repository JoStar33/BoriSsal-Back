const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getBoriGoods, getBoriGoodsById, deleteBoriGoods, makeBoriGoods, updateBoriGoods, likeBoriGoods, dislikeBoriGoods, updateBoriGoodsImage } = require("../../controllers/bori_goods/boriGoods")
const router = express.Router();
const { boriGoodsUpload } = require("../../utils/uploadImage")
const fs = require('fs');

try {
  fs.readdirSync('bori_goods_images');
} catch (error) {
  console.error('bori_goods_images 폴더가 없어 bori_goods_images 폴더를 생성합니다.');
  fs.mkdirSync('bori_goods_images');
};

//GET /bori_goods
router.get('/', getBoriGoods);

//GET /bori_goods/:bori_goods_id
router.get('/:bori_goods_id', getBoriGoodsById);

router.patch('/image/:bori_goods_id', isLoggedIn, boriGoodsUpload.single('bori_goods_images'), updateBoriGoodsImage)

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

router.put('/:bori_goods_id', isLoggedIn, updateBoriGoods)

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

router.delete('/:bori_goods_id', isLoggedIn, deleteBoriGoods)

module.exports = router;