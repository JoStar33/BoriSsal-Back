const Order = require("../../schemas/order/order");
//상세주문 정보는 배열의 형태로 관리한다.
//const OrderDetail = require("../schemas/order/orderDetail");

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.find({}); 
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
    }); 
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
      _id: req.body.order_id
    });
    return res.status(200).json(`정상적으로 삭제되었습니다. ${order}`);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

/*
  [
    user: {
      user_id: ~
    },
    products: [
      {
        product_id: ~,
        product_count: ~,
        product_price: ~
      }
    ],
  ]
*/
exports.makeOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(
      {
        user_id: req.body.user.user_id,
        order_status: false,
        orderDetail: req.body.products
      }
    );
    console.log("주문아이디: " + newOrder._id);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};