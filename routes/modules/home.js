const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
    const userId = req.user._id
    Todo.find({ userId: userId })
        .lean()
        .sort({ _id: 'asc' })//反序desc
        .then(todos => res.render('index', { todos: todos }))
        .catch(error => console.log(error))
})


module.exports = router