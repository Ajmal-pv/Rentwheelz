const express = require('express');
const user_route = express();
const userController = require('../Controllers/userController')


const {userAuth} = require('../middleware/jwtTokenDecode')

user_route.post('/signup',userController.userCreation)
user_route.post('/verifyUser',userController.userVerify)
user_route.post('/signin',userController.userSignin)
user_route.post('/verifyToken',userAuth,userController.userCheck)
user_route.post('/forgot-password',userController.forgotPassword)

user_route.post('/otp-checking',userController.forgotOtp)
user_route.post('/password-set',userController.passwordSet)


module.exports = user_route;