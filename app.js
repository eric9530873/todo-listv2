const express = require('express')
const mongoose = require('mongoose')

const exhbs = require('express-handlebars')

const Todo = require('./models/todo')
const todo = require('./models/todo')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error')
})
db.once('open', () => {
    console.log('mongodb connected')
})

app.engine('hbs', exhbs.engine({ defaultLayout: 'main', extname: 'hbs' }))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    //拿到全部todo
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos: todos }))
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log(`App is running on http://localhost:3000`)
})