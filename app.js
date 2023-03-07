const express = require('express')

const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')




const routes = require('./routes')
const app = express()

require('./config/mongoose')


app.engine('hbs', exhbs.engine({ defaultLayout: 'main', extname: 'hbs' }))

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



app.listen(3000, () => {
    console.log(`App is running on http://localhost:3000`)
})