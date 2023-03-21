const express = require("express");
const { getCategory, makeCategory, updateCategory, deleteCategory } = require("../../controllers/bori_goods/boriGoodsCategory")
const router = express.Router();

//GET /bori_goods-category
router.get('/', getCategory);

/*
POST /bori_goods-category
  {
    category_name: ~~~
  }
*/
router.post('/', makeCategory);

/*
PATCH /bori_goods-category
  {
    category_id: ~~~,
    category_name: ~~~
  }
*/
router.patch('/', updateCategory);

/*
DELETE /bori_goods-category
  {
    category_id: ~~~
  }
*/
router.delete('/', deleteCategory);


module.exports = router;