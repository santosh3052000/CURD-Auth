const express = require('express')
const router = express.Router()
const routeFunc = require('../controllers/route.controllers')
const Check = require('../controllers/check')
const authenticater = require('../middleware/authenticate')

router.get('/getAllUsers',authenticater.tokenCheck,routeFunc.show)
router.post('/register',routeFunc.create)
router.post('/login',Check.Password,authenticater.loginAuthenticator)
router.put('/update',authenticater.tokenCheck,routeFunc.update)
router.delete('/:id',authenticater.tokenCheck,routeFunc.delete)

module.exports = router