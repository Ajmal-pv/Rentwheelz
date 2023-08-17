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



module.exports = host_route;