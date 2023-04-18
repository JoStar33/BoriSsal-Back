const DeliverAddress = require("../../schemas/user/deliverAddress");
const Cart = require("../../schemas/user/cart");

exports.updateDeliverAddress = async (req, res, next) => {
  const { address_type, address_info } = req.body;
  try {
    let deliverAddress;
    if(address_type === 'phone_number') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: req.session.passport.user
      }, {
        phone_number: address_info
      });
    }
    else if(address_type === 'address') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: req.session.passport.user
      }, {
        address: address_info
      });
    }
    else if(address_type === 'address_detail') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: req.session.passport.user
      }, {
        address_detail: address_info
      });
    }
    if(!deliverAddress) {
      return res.status(400).json({
        message: '잘못된 정보를 전달했습니다. 다시 확인해주세요.',
      });
    }
    return res.status(200).json(deliverAddress);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getDeliverAddress = async (req, res, next) => {
  try {
    const deliverAddress = await DeliverAddress.findOne({
      user_id: req.session.passport.user
    });
    return res.status(200).json(deliverAddress);
  } catch(error) {
    console.error(error);
    return next(error);
  }
}
