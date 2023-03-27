const Order = require("../../schemas/order/order");
const Cart = require("../../schemas/user/cart")
//상세주문 정보는 배열의 형태로 관리한다.
//const OrderDetail = require("../schemas/order/orderDetail");
const { asyncForEach } = require('../../utils/asyncForEach');

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.find({
      user_id: req.session.passport.user
    }).select('-user_id'); 
    return res.status(200).json(order);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//주문 하나에 대한 정보 조회
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.find({
      order_id: req.params.order_id
    }).select('-user_id'); ; 
    return res.status(200).json(order);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//delete
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.remove({
      _id: req.params.order_id
    });
    return res.status(200).json({message: `정상적으로 삭제되었습니다. ${order._id}`});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

/*
  [
    bori_goods: [
      {
        bori_goods_id: ~,
        bori_goods_name: ~,
        bori_goods_image: ~,
        bori_goods_count: ~,
        bori_goods_price: ~
      }
    ],
  ]
*/
exports.makeOrder = async (req, res, next) => {
  const { bori_goods, price } = req.body
  try {
    await asyncForEach(bori_goods, async (goods) => {
      await Cart.findOneAndRemove({
        bori_goods_id: goods.bori_goods_id
      });
    });
    await Order.create(
      {
        user_id: req.session.passport.user,
        price: price,
        order_status: '배송준비',
        order_detail: bori_goods
      }
    );
    res.status(200).json({message: `정상적으로 주문됐습니다.`});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};