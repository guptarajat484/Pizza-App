const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pizza', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(result => {
    console.log("Database Connected")
}).catch(err => {
    console.log(err)
})


module.exports = mongoose;