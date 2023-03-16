const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require("../../schemas/user/user");
const DeliverAddress = require("../../schemas/user/deliverAddress");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ email: email });
    if (exUser) {
      return res
        .status(400)
        .json({ message: "해당 이메일은 이미 존재합니다." });
    }
    const exNickUser = await User.findOne({ nick: nick });
    if (exNickUser) {
      return res
        .status(400)
        .json({ message: "해당 닉네임은 이미 존재합니다." });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nick,
      password: hash,
    });
    await DeliverAddress.create({
      user_id: user._id,
      phone_number: "",
      address: "",
      address_detail: ""
    });
    return res.status(200).json({
      message: '회원가입이 정상적으로 이루어졌습니다.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.passwordChange = async (req, res, next) => {
  const { id, password, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    const hashPass = await bcrypt.hash(password, 12);
    const hashNewPass = await bcrypt.hash(newPassword, 12);
    if (!user) {
      return res
        .status(400)
        .json({ message: "잘못된 회원정보입니다." });
    }
    if (hashPass !== user.password) {
      return res
        .status(400)
        .json({ message: "현재 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요." });
    }
    if(password === newPassword) {
      return res
      .status(400)
      .json({ message: "현재 비밀번호와 같은 비밀번호입니다. 다시 확인해주세요." });
    } 
    await User.findByIdAndUpdate(id, {
      password: hashNewPass
    });
    return res.json({message: "ok"});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.emailDuplicate = async (req, res, next) => {
  const { email } = req.body;
  try {
    const exUser = await User.findOne({ email: email });
    if (exUser) {
      return res
        .status(400)
        .json({ message: "해당 이메일은 이미 존재합니다." });
    }
    return res.json({message: "ok"});
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.nickDuplicate = async (req, res, next) => {
  const { nick } = req.body;
  try {
    const exUser = await User.findOne({ nick: nick });
    if (exUser) {
      return res
        .status(400)
        .json({ message: "해당 닉네임은 이미 존재합니다." });
    }
    return res.json({ message: 'ok' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(500).json({
        code: 500,
        message: info.message,
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        nick: user.nick,
        provider: user.provider,
        profile_image: user.profile_image,
        user_role: user.user_role,
        sns_id: user.sns_id,
        created_at: user.created_at,
        user_product_like: user.user_product_like,
        user_product_like: user.user_bori_gallery_like,
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.isLogIn = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "로그인 상태입니다.",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.isNotLogIn = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "로그인하지 않은 상태입니다.",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.kakaoLogin = (req, res, next) => {
  passport.authenticate('kakao', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(500).json({
        code: 500,
        message: info.message,
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.redirect(`${process.env.REDIRECT_URL}/oauth?user_id=${user._id}`);
    });
  })(req, res, next);
}

exports.googleLogin = (req, res, next) => {
  passport.authenticate('google', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(500).json({
        code: 500,
        message: info.message,
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.redirect(`${process.env.REDIRECT_URL}/oauth?user_id=${user._id}`);
    });
  })(req, res, next);
}

exports.logout = (req, res) => {
  try {
    req.logout();
    return res.status(200).json({
      message: "로그아웃이 성공적으로 완료됐습니다..",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

