const passport = require("passport");

const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((user, next) => {
  next(null, user.id); //"12321312313123123"
});
passport.deserializeUser(async (id, next) => {
  try {
    let user = await User.findOne({ id });
    next(null, user);
  } catch (error) {
    return next(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://ecombe.herokuapp.com/api/users/login/googleok",
      // callbackURL: "http://localhost:3000/login",
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "https://ecombe.herokuapp.com/api/users/login/facebookok",
      // callbackURL: "http://localhost:3000/login",
      profileFields: ["id", "email", "displayName"],
    },
      (accessToken, refreshToken, profile, done) => {
          console.log("success login with facebook", accessToken, profile);
          return done(null, profile);
    }
    )
);
    