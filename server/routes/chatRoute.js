const express= require('express');
const { createChat, userChats, findChat, getChats, getusers } = require('../Controllers/chatController');
const chat_route =express();


chat_route.post('/',createChat)
chat_route.get('/:userId',userChats)
chat_route.get('/find/:firstId/:secondId',findChat)
chat_route.get('/getusers',getusers)

module.exports=chat_route