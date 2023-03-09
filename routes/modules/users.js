const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}));

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    User.findOne({ email })
        .then(user => {
            if (user) {
                console.log('User already exists')
                res.render('register', {
                    name,
                    email,
                })
            } else {
                return User.create({
                    name,
                    email,
                    password,
                    confirmPassword
                })
                    .then(() => res.redirect('/'))
                    .catch(error => console.log(error))
                // const newUser = new User({
                //     name,
                //     email,
                //     password
                // })
                // newUser
                //     .save()
                //     .then(() => res.redirect('/'))
                //     .catch(error => console.log(error))
            }
        })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router