const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session)
const passport = require('passport');
const app = express()
const PORT = process.env.PORT || 3000

app.use(expressLayout)
app.use(flash())
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

storeSession = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
})

app.use(session({
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: storeSession,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`)
})