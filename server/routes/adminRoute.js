const express = require('express');
const admin_route =express();
const adminController = require('../Controllers/adminController');
const {adminAuth} = require('../middleware/jwtTokenDecode');


admin_route.post('/login',adminController.adminSignin)
admin_route.post('/verifyToken',adminAuth,adminController.adminCheck)
admin_route.get('/cars',adminAuth,adminController.cars)
admin_route.get('/hosts',adminAuth,adminController.hosts)

module.exports=admin_route