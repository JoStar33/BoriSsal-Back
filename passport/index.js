const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const google = require("./googleStrategy");
const User = require("../schemas/user/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      id: id,
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
  google();
};
