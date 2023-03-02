const Product = require("../../schemas/product/product");
const User = require("../../schemas/user/user");

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({}); 
    return res.status(200).json(product);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(
      req.params.product_id
    ); 
    return res.status(200).json(product);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeProduct = async (req, res, next) => {
  try {
    const exProduct = await Product.find({
      product_name: req.body.product.product_name
    });
    if(exProduct.length >= 1) {
      return res.status(400).json("이미 존재하는 상품입니다. 다시 등록해주세요.");
    };
    const newProduct = await Product.create(
      {
        category_id: req.body.category_id,
        product_name: req.body.product.product_name,
        product_price: req.body.product.product_price,
        product_stock: req.body.product.product_stock,
        product_desc: req.body.product.product_desc,
        product_img: `/img/${req.file.filename}`,
      }
    );
    console.log(newProduct._id);
    return res.status(200).json({
      message: "제품등록이 완료됐습니다.",
      newProduct
    });
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//좋아요를 사용자가 눌렀을 경우.
/*
{
  product_id: ~~~,
  user_id: ~~~
}
*/
exports.likeProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(
      req.body.product_id, {
        product_like: { $inc: 1 }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.body.user_id, {
        $push: { user_product_like: req.body.product_id }
      }
    );
    res.status(200).json({
      user_product_like: user.user_product_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.dislikeProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(
      req.body.product_id, {
        product_like: { $inc: -1 }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.body.user_id, {
        $pull: { user_product_like: req.body.product_id }
      }
    );
    res.status(200).json({
      user_product_like: user.user_product_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};