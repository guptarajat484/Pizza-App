const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'User Not Found' })
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in Succesfull' })
            }
            return done(null, false, { message: 'Password Wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,done)
        })
      
    })
}
module.exports = init