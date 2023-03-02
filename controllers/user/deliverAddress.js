const DeliverAddress = require("../../schemas/user/deliverAddress");

exports.modifyDeliverAddress = async (req, res, next) => {
  const { user_id, address, phone_number, address_detail } = req.body;
  try {
    const deliverAddress = await DeliverAddress.findOneAndUpdate({
      user_id: user_id
    }, {
      phone_number: phone_number,
      address: address,
      address_detail: address_detail
    });
    return res.status(200).json(deliverAddress);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};
