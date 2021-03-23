const menu = require('../../models/menu');
const menuModel = require('../../models/menu')

function homeController() {
    return {
        async index(req, res) {
            m = await menuModel.find()

            return res.render('home', { pizzas: m })
        }
    }
}

module.exports = homeController;