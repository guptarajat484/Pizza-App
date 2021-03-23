const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../../models/user')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password } = req.body
            if (!email || !password) {
                req.flash('err', 'All fields are required')
                req.flash('email', email)
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })

            })(req, res, next)
        },
        signup(req, res) {
            res.render('auth/register')
        },
        async postRoute(req, res) {
            const { name, email, password } = req.body
            if (!email || !password || !name) {
                req.flash('err', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            us = await User.exists({
                email
            })

            if (us) {

                req.flash('err', 'User is already exist')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            const hash = await bcrypt.hash(password, 15);
            u = new User({
                name: name,
                email: email,
                password: hash
            })
            u.save().then(data => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('err', 'something went wrong')
                return res.redirect('/register')
            })
        },
        logout(req, res) {
            console.log('logout')
            req.logout()
            return res.redirect('/')
        }
    }
}

module.exports = authController