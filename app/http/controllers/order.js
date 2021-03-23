const Orders = require('../../models/order')
function order() {
    return {
        store(req, res) {
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash('err', 'All fields are required')
                res.redirect('/cart')
            }
            console.log(req)
            const order = new Orders({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(result => {
                console.log("Sucess")
                req.flash('success', 'Order Placed Succesful')
                return res.redirect('/')
            }).catch(err => {
                console.log(err)
                req.flash('err', 'Somethig Wrong')
                return res.redirect('/cart')
            })
        }
    }
}

module.exports = order