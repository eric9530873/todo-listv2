const express = require('express')
const mongoose = require('mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB

const db = mongoose.connect

db.on('error', () => {
    console.log('mongodb error')
})
db.once('open', () => {
    console.log('mongodb connected')
})


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log(`App is running on http://localhost:3000`)
})