const DeliverAddress = require("../schemas/user/deliverAddress");
const User = require("../schemas/user/user");
const Cart = require("../schemas/user/cart")

exports.modifyUserNick = async (req, res, next) => {
  try {
    await User.update({
      user_id: req.params.user_id
    }, {
      nick: req.body.user.nick,
    });
    return res.status(200).send("유저 닉네임 업데이트 완료");
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.modifyDeliverAddress = async (req, res, next) => {
  const { user_id, address, address_detail } = req.body;
  try {
    const deliverAddress = await DeliverAddress.update({
      user_id: user_id,
      address: address,
      address_detail: address_detail
    }, {
      nick: req.body.user.nick,
    });
    return res.status(200).json(deliverAddress);
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
    return res.status(200).send("장바구니 등록 성공");
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.modifyCart = async (req, res, next) => {
  const { cart_id, product } = req.body;
  try {
    const cart = await Cart.update({
      _id: cart_id
    }, {
      product_id: product.product_id,
      product_count: product.product_count
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