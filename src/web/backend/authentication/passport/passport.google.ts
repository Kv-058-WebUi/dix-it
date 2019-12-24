import { Strategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../../config";

const googleStrategy = new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
  return cb(undefined, profile);
});

export default googleStrategy;