const con = require('./connection')

const userSchema = new con.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    }
}, {
    timestamps: true
})

module.exports = con.model('User', userSchema)