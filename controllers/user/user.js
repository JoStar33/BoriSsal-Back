const User = require("../../schemas/user/user");

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