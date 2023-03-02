const Order = require("../schemas/order/order");
const OrderDetail = require("../schemas/order/orderDetail");

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll({}); 
    return res.status(200).json(order);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

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
    product: {
      product_id: ~,
      product_count: ~,
      product_price: ~
    }
  ]
*/
exports.makeOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(
      {
        user_id: req.body.user.user_id,
        order_status: false,
        orderDetail: req.body.product
      }
    );
    console.log("주문아이디: " + newOrder._id);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};