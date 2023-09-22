const express = require('express');
const host_route = express();
const hostController = require('../Controllers/hostController');
const {hostAuth} = require('../middleware/jwtTokenDecode');
const upload = require('../configeration/multerConfig')




host_route.post('/signup',hostController.hostCreation)
host_route.post('/verifyHost',hostController.hostVerify)
host_route.post('/Addcar',upload.array('images', 5),hostController.carAdd)
host_route.post('/verifyToken',hostAuth,hostController.hostCheck)
host_route.post('/signin',hostController.hostSignin)
host_route.get('/cardetails',hostAuth,hostController.carDetails)
host_route.get('/hostCar',hostAuth,hostController.hostCars)
host_route.post('/rentcar',hostAuth,hostController.carRent)
host_route.get('/Bookedcars',hostAuth,hostController.Bookedcars)

module.exports = host_route;