import { Strategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET, JWT_EXPIRATION } from "../../../../config";


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: JWT_EXPIRATION
  }
};
const jwtStrategy = new Strategy(jwtOptions, async function (jwtPayload, done) {
  return done(null, jwtPayload);
});

export default jwtStrategy;