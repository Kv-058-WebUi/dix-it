import passport from "passport";
import jwtStrategy from "./passport.jwt";
import googleStrategy from "./passport.google";

passport.use(jwtStrategy);
passport.use(googleStrategy);

export default passport;