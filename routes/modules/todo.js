const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const name = req.body.name

    const todo = new Todo({ name, userId })
    return todo.save()
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
})

router.get('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Todo.findOne({ _id, userId })
        .lean()
        .then(todo => res.render('detail', { todo }))
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Todo.findOne({ _id, userId })
        .lean()
        .then(todo => res.render('edit', { todo }))
})

router.put('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const name = req.body.name
    const isDone = req.body.isDone
    Todo.findOne({ _id, userId })
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${_id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Todo.findOne({ _id, userId })
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router