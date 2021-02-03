const express = require('express')
const ejs = require('ejs')
const path = require('path')
var expressLayouts = require('express-ejs-layouts');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`)
})