const Cart = require("../../schemas/user/cart");
const { asyncForEach } = require('../../utils/asyncForEach');

//모든 장바구니 정보 조회.
//상세 장바구니 조회는 기능이 필요없다고 판단함.
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({
      user_id: req.params.user_id
    });
    return res.status(200).json(cart);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

/*
{
  user_id: ~~,
  product: [
    {
      product_id: ~~~
      product_count: ~~~
    }
  ]
}
*/
exports.makeCart = async (req, res, next) => {
  const { user_id, products } = req.body;
  try {
    await asyncForEach(products, async (product) => {
      await Cart.create({
        user_id: user_id,
        product_id: product.product_id,
        product_count: product.product_count
      });
    });
    return res.status(200).json({
      message: "장바구니 등록 성공",
    });
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//수량을 수정하는 경우밖에 없으므로
exports.updateCart = async (req, res, next) => {
  const { cart_id, product_count } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(cart_id, {
      product_count: product_count
    });
    return res.status(200).json(cart);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.remove({
      _id: req.body.cart_id
    });
  } catch(error) {
    console.error(error);
    return next(error);
  };
};