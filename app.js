const express = require('express')

const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose')


const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000




app.engine('hbs', exhbs.engine({ defaultLayout: 'main', extname: 'hbs' }))

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})