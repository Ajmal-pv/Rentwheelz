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
user_route.post('/create-checkout-session',userAuth,userController.stripePayment)


user_route.post('/ordercreation',userAuth,userController.orderCreation)
user_route.post('/edit-profile',userAuth,userController.editProfile)
user_route.get('/userBooking',userAuth,userController.userBookings)
user_route.post('/cancelbooking',userAuth,userController.cancelBooking)
user_route.post('/cancelbookingOngoing',userAuth,userController.cancelBookingOngoing)

user_route.get('/getwallet',userAuth,userController.getwallet)


module.exports = user_route;