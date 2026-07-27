const express = require('express')
const router = express.Router()
const routeFunc = require('../controllers/route.controllers')
const Check = require('../controllers/check')
const authenticater = require('../middleware/authenticate')
const authorization = require('../middleware/authorize')
const ownership = require('../middleware/ownership')

router.get('/getAllUsers',authenticater.tokenCheck,authorization.authorize("admin","manager"),routeFunc.show)
router.post('/register',authenticater.tokenCheck,authorization.authorize("admin"),routeFunc.create)
router.post('/login',Check.Password,authenticater.loginAuthenticator)
router.put('/users/:id',authenticater.tokenCheck,ownership,routeFunc.update)
router.delete('/users/:id',authenticater.tokenCheck,authorization.authorize("admin"),ownership,routeFunc.delete)

module.exports = router

/*
RBAC

admin → create, read, update, delete anyone
manager → read, update employees but not admins
user → update only themselves
*/