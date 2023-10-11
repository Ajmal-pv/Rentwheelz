const express= require('express');
const { createChat, userChats, findChat } = require('../Controllers/chatController');
const chat_route =express();


chat_route.post('/',createChat)
chat_route.get('/:userId',userChats)
chat_route.get('/find/:firstId/:secondId',findChat)

module.exports=chat_route