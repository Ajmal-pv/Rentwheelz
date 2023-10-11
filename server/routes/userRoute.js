const express = require('express');
const user_route = express();
const userController = require('../Controllers/userController')


const {userAuth} = require('../middleware/jwtTokenDecode')

user_route.post('/signup',userController.userCreation)
user_route.post('/verifyUser',userController.userVerify)
user_route.post('/signin',userController.userSignin)
user_route.post('/verifyToken',userAuth,userController.userCheck)
user_route.post('/forgot-password',userController.forgotPassword)

user_route.get('/cars',userController.getCars)
user_route.get('/carDetails',userController.getCarDetails)


user_route.post('/otp-checking',userController.forgotOtp)
user_route.post('/password-set',userController.passwordSet)
user_route.get('/specialCars',userController.specialCar)
user_route.get('/getuser',userController.getUser)

user_route.get('/datesSelected',userController.getDates)
user_route.post('/create-checkout-session',userController.stripePayment)


user_route.post('/ordercreation',userController.orderCreation)
user_route.post('/edit-profile',userController.editProfile)
user_route.get('/userBooking',userController.userBookings)


module.exports = user_route;