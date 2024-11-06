const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Corrected capitalization
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, pwd, done) => {
    try {
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: "User not found" }); // User does not exist
        }

        const isPasswd = await user.comparePassword(pwd); // Compare passwords
        if (isPasswd) {
            return done(null, user); // Password matches
        } else {
            return done(null, false, { message: "Invalid password" }); // Password does not match
        }
    } catch (err) {
        return done(err); // Handle errors
    }
}));

module.exports = passport;
