const BoriGoodsCategory = require("../../schemas/bori_goods/boriGoodsCategory")

exports.getCategory = async (req, res, next) => {
  try {
    const boriGoodsCategory = await BoriGoodsCategory.find({});
    return res.status(200).json(boriGoodsCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeCategory = async (req, res, next) => {
  try {
    const boriGoodsCategory = await BoriGoodsCategory.create({
      category_name: req.body.category_name
    });
    return res.status(200).json(boriGoodsCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateCategory = async (req, res, next) => {
  const {category_id, category_name} = req.body;
  try {
    const boriGoodsCategory = await BoriGoodsCategory.findByIdAndUpdate(category_id, {
      category_name: category_name
    });
    return res.status(200).json(boriGoodsCategory);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await BoriGoodsCategory.remove({
      _id: req.body.category_id
    });
    return res.status(200).json({message: "카테고리 삭제 완료"});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};