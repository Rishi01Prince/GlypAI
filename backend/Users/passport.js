const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/user/auth/google/callback",
    scope: ['profile', 'email'] 
},
async (accessToken, refreshToken, profile, callback) => {
    try {
        const { displayName: name, emails, photos } = profile;
        const email = emails && emails[0] ? emails[0].value : null;
        const picture = photos && photos[0] ? photos[0].value : null;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                picture,
                password: "N/A", // OAuth users may not have a password
                phone: null,
                address: null
            });
            await user.save();
        } else {
            user.name = name || user.name;
            user.picture = picture || user.picture;
            await user.save();
        }

        return callback(null, user);
    } catch (err) {
        console.error('Error during Google OAuth: ', err);
        return callback(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
