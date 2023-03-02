const express = require("express");
const { getCategory, makeCategory, updateCategory, deleteCategory } = require("../../controllers/product/productCategory")
const router = express.Router();

//GET /product-category
router.get('/', getCategory);

/*
POST /product-category
  {
    category_name: ~~~
  }
*/
router.post('/', makeCategory);

/*
PATCH /product-category
  {
    category_id: ~~~,
    category_name: ~~~
  }
*/
router.patch('/', updateCategory);

/*
DELETE /product-category
  {
    category_id: ~~~
  }
*/
router.delete('/', deleteCategory);


module.exports = router;