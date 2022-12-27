const LocalStrategy = require('passport-local').Strategy

const User = require('./Models/User')

module.exports = (passport) => {
    passport.use(new LocalStrategy( async (username, password, done) => {
        try {
            let user = await User.findOne({ username });
           

            if (!user) return done(null, false,{message:"user not found"})

            if (user.password !== password) return done(null, false,{message:"password not match"})

            return done(null, user)
        } catch (error) {
            return done(error, false)
        }


    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error, false)
        }
    }
    )

}