const mongoose = require('mongoose')

require('dotenv').config()
// if (process.env.NODE_ENV === 'production') {
//     require('dotenv').config()
// }

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error')
})
db.once('open', () => {
    console.log('mongodb connected')
})

module.exports = db