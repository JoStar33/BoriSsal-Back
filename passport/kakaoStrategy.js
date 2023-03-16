const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const DeliverAddress = require("../schemas/user/deliverAddress");
const User = require('../schemas/user/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const localExUser = await User.findOne({
        email: profile._json.kaccount_email,
        $or: [
          { provider: 'local' }, 
          { provider: 'google' }
        ]
      });
      if (localExUser) {
        done("존재하는 유저 이메일");
      }
      const exUser = await User.findOne({
        sns_id: profile.id, provider: 'kakao'
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          sns_id: profile.id,
          provider: 'kakao',
        });
        await DeliverAddress.create({
          user_id: newUser._id,
          phone_number: "",
          address: "",
          address_detail: ""
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
