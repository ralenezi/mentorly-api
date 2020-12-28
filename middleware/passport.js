const LocalStrategy = require("passport-local");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

// sign in
exports.localStrategy = new LocalStrategy(async (email, password, done) => {
  //
  console.log("Hello?");
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    // check if password match
    const userAuthenticated =
      user && (await bcrypt.compare(password, user.password));

    return done(null, userAuthenticated && user);
  } catch (error) {
    console.log("Error:", error);
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    const secondsLeft = (jwtPayload.exp - Date.now()) / 1000;
    console.log(`Seconds left on this session: ${secondsLeft}s`);
    // TODO: Fix me here, it's crashing when the session is expired!
    try {
      if (jwtPayload.exp < Date.now()) {
        let error = new Error("Token is expired");
        error.status = 401;
        // return done(error); // status 401
        throw error;
      }
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
