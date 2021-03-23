

function guest(req, res, next) {
    if (!req.isAutheticated) {
        return next()
    }
    return res.redirect('/')
}

module.exports = guest