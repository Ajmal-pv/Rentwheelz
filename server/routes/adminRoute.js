const express = require('express');
const admin_route =express();
const adminController = require('../Controllers/adminController');
const {adminAuth} = require('../middleware/jwtTokenDecode');


admin_route.post('/login',adminController.adminSignin)
admin_route.post('/verifyToken',adminAuth,adminController.adminCheck)
admin_route.get('/cars',adminAuth,adminController.cars)

admin_route.get('/carBlock',adminAuth,adminController.carBlock)
admin_route.get('/hosts',adminAuth,adminController.hosts)

admin_route.get('/users',adminAuth,adminController.users)
admin_route.post('/userBlock',adminAuth,adminController.userBlock)

admin_route.post('/userUnBlock',adminAuth,adminController.userUnBlock)


admin_route.get('/cardetails',adminAuth,adminController.carDetails)
admin_route.post('/carApproval',adminAuth,adminController.carApproval)
admin_route.post('/carReject',adminAuth,adminController.carReject)
admin_route.get('/carbookings',adminAuth,adminController.bookingDetails)
admin_route.get('/orderedcars',adminAuth,adminController.orderedCars)


module.exports=admin_route