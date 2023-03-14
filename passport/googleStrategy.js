const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const DeliverAddress = require("../schemas/user/deliverAddress");
const User = require('../schemas/user/user');

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'auth/google'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({
        where: { sns_id: profile.id, provider: 'google' },
      });
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