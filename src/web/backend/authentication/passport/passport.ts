import passport from "passport";
import jwtStrategy from "./passport.jwt";

passport.use(jwtStrategy);

export default passport;