const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require("../schemas/user");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.find({ email: email });
    if (exUser !== []) {
      return res
        .status(400)
        .json({ message: "해당 이메일은 이미 존재합니다." });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.status(200).send('회원가입이 정상적으로 이루어졌습니다.');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

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
      return res.json({
        id: user._id,
        email: user.email,
        nick: user.nick,
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

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
      return res.json({
        id: user._id,
        email: user.email,
        nick: user.nick,
      });
    });
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout(() => {
    res.status(200).send('로그아웃이 성공적으로 완료됐습니다.');
  });
};
