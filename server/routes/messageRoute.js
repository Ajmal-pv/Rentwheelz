const express= require('express');
const { getMessages, addMessage } = require('../Controllers/messageController');

const message_route =express();

message_route.post('/',addMessage)
message_route.get('/:chatId',getMessages)


module.exports = message_route