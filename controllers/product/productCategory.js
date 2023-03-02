const ProductCategory = require("../../schemas/product/productCategory")

exports.getCategory = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.find({});
    return res.status(200).json(productCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeCategory = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.create({
      category_name: req.body.category_name
    });
    return res.status(200).json(productCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateCategory = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.update({
      _id: req.body.category_id
    }, {
      category_name: req.body.category_name
    });
    return res.status(200).json(productCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.remove({
      _id: req.body.category_id
    });
    return res.status(200).send("카테고리 삭제 완료");
  } catch(error) {
    console.error(error);
    return next(error);
  }
};