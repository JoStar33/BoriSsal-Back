const Product = require("../schemas/product/product");

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findAll({}); 
    return res.status(200).json(product);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.find({
      product_id: req.params.product_id
    }); 
    return res.status(200).json(product);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeProduct = async (req, res, next) => {
  try {
    const exProduct = await Product.find({
      product_name: req.body.product_name
    });
    if(exProduct.length >= 1) {
      return res.status(400).json("이미 존재하는 상품입니다. 다시 등록해주세요.");
    }
    const newProduct = await Product.create(
      {
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_stock: req.body.product_stock,
        product_desc: req.body.product_desc,
        product_img: req.body.product_img,
      }
    );
    console.log(newProduct._id);
    return res.status(200).json({
      message: "제품등록이 완료됐습니다.",
      newProduct
    })
  } catch(error) {
    console.error(error);
    return next(error);
  }
}