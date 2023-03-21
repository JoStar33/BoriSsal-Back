const User = require("../../schemas/user/user");

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user_id).select('_id email sns_id nick profile_image created_at user_bori_goods_like user_bori_gallery_like');
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      nick: user.nick,
      provider: user.provider,
      profile_image: user.profile_image,
      user_role: user.user_role,
      sns_id: user.sns_id,
      created_at: user.created_at,
      user_bori_goods_like: user.user_bori_goods_like,
      user_bori_gallery_like: user.user_bori_gallery_like,
    });
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
    return res.status(200).json({
      message: "유저 닉네임 업데이트 완료"
    });
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
    res.status(200).json({profile_image: `/img/${req.file.filename}`});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};