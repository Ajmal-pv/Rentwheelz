const express = require('express');
const admin_route =express();
const adminController = require('../Controllers/adminController');
const {adminAuth} = require('../middleware/jwtTokenDecode');


admin_route.post('/login',adminController.adminSignin)
admin_route.post('/verifyToken',adminAuth,adminController.adminCheck)

module.exports=admin_route