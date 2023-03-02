const DeliverAddress = require("../../schemas/user/deliverAddress");

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
