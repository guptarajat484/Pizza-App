authController = require('../app/http/controllers/auth')
homeController = require('../app/http/controllers/home')
cartController = require('../app/http/controllers/cart')
orderController = require('../app/http/controllers/order')
const g = require('../app/http/middlewares/guest')

function initRouter(app) {

    app.get('/', homeController().index)

    app.get('/login', g, authController().login)

    app.post('/login', authController().postLogin)

    app.get('/register', g, authController().signup)

    app.post('/register', authController().postRoute)

    app.get('/cart', cartController().cart)

    app.post('/update-cart', cartController().update)

    app.all('/logout', authController().logout)

    app.post('/orders', orderController().store)

}

module.exports = initRouter