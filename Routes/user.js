const express = require("express")
const { registerUser, logout, login, profile } = require("../Controller/user")
const { isAuth } = require("../isauth")

const router = express.Router()

router.route('/register').post(registerUser)

router.route('/login').post(login,isAuth)

router.route('/logout').get(logout)

router.route('/profile').get(profile)



module.exports = router
