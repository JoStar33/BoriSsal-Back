const User = require("../../schemas/user/user");

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = User.findById(req.params.user_id).select('email sns_id nick profile_image created_at');
    res.status(200).json(user);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.modifyUserNick = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.user_id, {
      nick: req.body.nick,
    });
    return res.status(200).send("유저 닉네임 업데이트 완료");
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.setUserProfileImage = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.user_id, {
      profile_image: `/img/${req.file.filename}`,
    });
    res.status.json(`/img/${req.file.filename}`);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};