const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute')
const hostRoute= require('./routes/hostRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute= require('./routes/messageRoute')

mongoose.connect('mongodb://127.0.0.1:27017/rent-Wheelz');
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to database', err);
});

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST'],
 
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))


app.use('/', userRoute);
app.use('/admin',adminRoute)
app.use('/host',hostRoute)
app.use('/chat',chatRoute)
app.use('/message',messageRoute)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


// //-----------------

// const io = require('socket.io')(server,{
//   cors:{
//       origin:'http://localhost:5173',
//       methods: ['GET', 'POST'],
//   }
// })
// let activeUsers=[]
// io.on('connection',(socket)=>{
//   // add new user
//   socket.on("new-user-add", (newUserId) => {
//       console.log("-----");
//       if (!activeUsers.some((user) => user.userId === newUserId)) {
//         activeUsers.push({
//           userId: newUserId,
//           socketId: socket.id,
//         });
//       }
//       console.log(activeUsers,'active users')
//       io.emit("get-users", activeUsers)
//   })
  
//     // send message to a specific user
// socket.on("send-message", (data) => {
//   const { recieverId } = data;
//   console.log(recieverId+'recive Id');
//   console.log(activeUsers);
//   const user = activeUsers.find((user) => user.userId === recieverId);
//   console.log(user,'reciever found from active');

//   console.log("Sending from socket to :", recieverId)
//   console.log("Data: ", data)
//   if (user) {
    
//     io.to(user.socketId).emit("receive-message", data);
//   }
// });


//       socket.on("disconnected", () => {
//           activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//           io.emit("get-users", activeUsers);
//           console.log("userDisconnected", activeUsers);
//         });

// })