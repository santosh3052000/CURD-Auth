const express = require('express')
const router = express.Router()
const routeFunc = require('../controllers/route.controllers')
const Check = require('../controllers/check')

router.get('/getAllUsers',Check.Token,routeFunc.show)
router.post('/register',routeFunc.create)
router.post('/login',Check.Password,routeFunc.login)
router.put('/update',Check.Token,routeFunc.update)
router.delete('/:id',Check.Token,routeFunc.delete)

module.exports = router