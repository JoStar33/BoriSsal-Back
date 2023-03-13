const DeliverAddress = require("../../schemas/user/deliverAddress");

exports.updateDeliverAddress = async (req, res, next) => {
  const { user_id, address_type, address_info } = req.body;
  try {
    let deliverAddress;
    if(address_type === 'phone_number') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: user_id
      }, {
        phone_number: address_info
      });
    }
    else if(address_type === 'address') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: user_id
      }, {
        address: address_info
      });
    }
    else if(address_type === 'address_detail') {
      deliverAddress = await DeliverAddress.findOneAndUpdate({
        user_id: user_id
      }, {
        address_detail: address_info
      });
    }
    if(!deliverAddress) {
      return res.status(500).json('잘못된 정보를 전달했습니다. 다시 확인해주세요.');
    }
    return res.status(200).json(deliverAddress);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getDeliverAddress = async (req, res, next) => {
  try {
    const deliverAddress = await DeliverAddress.find({
      user_id: req.params.user_id
    });
    return res.status(200).json(deliverAddress);
  } catch(error) {
    console.error(error);
    return next(error);
  }
}
