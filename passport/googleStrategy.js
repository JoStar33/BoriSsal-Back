const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DeliverAddress = require("../schemas/user/deliverAddress");
const User = require('../schemas/user/user');

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${CURRENT_DOMAIN}/auth/google`,
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const localExUser = await User.findOne({
        $or: [
          { $and: [
            { email: profile.emails[0].value }, 
            { provider: 'kakao' }
          ]},
          { $and: [
            { email: profile.emails[0].value }, 
            { provider: 'local' }
          ]}
        ]
      });
      if (localExUser) {
        done(null, true, { message : '존재하는 유저 이메일' });
      }
      const exUser = await User.findOne({ sns_id: profile.id, provider: 'google' });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile.emails[0].value,
          nick: profile.displayName,
          sns_id: profile.id,
          provider: 'google',
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
  }))
}