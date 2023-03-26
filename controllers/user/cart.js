const Cart = require("../../schemas/user/cart");
const BoriGoods = require("../../schemas/bori_goods/boriGoods");

//모든 장바구니 정보 조회.
//상세 장바구니 조회는 기능이 필요없다고 판단함.
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({
      user_id: req.session.passport.user
    });
    return res.status(200).json(cart);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

/*
다중 등록할 일이 없음. 걍 단일로 수정.
서버에 부담을 안줄 수 있는 방법을 찾다가 클라이언트에서 모든 정보를 보내도록 수정.
{
  bori_goods_id: ~~~,
  bori_goods_count: ~~~
}
*/
exports.makeCart = async (req, res, next) => {
  const { bori_goods_id, bori_goods_name, bori_goods_image, bori_goods_price } = req.body;
  try {
    const exCart = await Cart.findOne({
      user_id: req.session.passport.user,
      bori_goods_id: bori_goods_id
    })
    if (exCart) {
      return res
        .status(400)
        .json({ message: "이미 장바구니에 등록된 상품입니다." });
    }
    await Cart.create({
      user_id: req.session.passport.user,
      bori_goods_id: bori_goods_id,
      bori_goods_count: 1,
      bori_goods_name: bori_goods_name,
      bori_goods_image: bori_goods_image,
      bori_goods_price: bori_goods_price
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
  const { cart_id, bori_goods_count } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(cart_id, {
      bori_goods_count: bori_goods_count
    });
    return res.status(200).json(cart);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findOneAndRemove({
      user_id: req.session.passport.user,
      _id: req.params.cart_id
    });
    return res.status(200).json({
      message: '삭제 성공!'});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};