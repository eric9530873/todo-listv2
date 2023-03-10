const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

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
    const errors = []

    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填' })
    }

    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不符' })
    }

    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }

    User.findOne({ email })
        .then(user => {
            if (user) {
                errors.push({ message: '這個 Email 已經註冊過了。' })
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword
                })
            }

            return bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash
                }))
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

        })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '成功登出')
    res.redirect('/users/login')
})

module.exports = router