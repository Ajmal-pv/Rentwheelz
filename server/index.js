const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const {Server} = require('socket.io');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute')
const hostRoute= require('./routes/hostRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute= require('./routes/messageRoute');

require('dotenv').config()
const port = process.env.port
const mongoUrl = process.env.mongoUrl;
const frontend = process.env.frontbaseUrl 
mongoose.connect(mongoUrl)
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to database', err);
});


app.use(cookieParser());
app.use(cors({
  origin: [frontend],
  credentials: true,
  methods: ['GET', 'POST'],
 
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))

// Create an HTTP server
const server = http.createServer(app);


app.use('/', userRoute);
app.use('/admin',adminRoute)
app.use('/host',hostRoute)
app.use('/chat',chatRoute)
app.use('/message',messageRoute)



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

server.listen(port, () => {
  console.log('Server is running on port 5000');
})


const io = new Server(server,{
  cors:{
    origin:frontend
  }
})

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
   
    io.emit('receive-message', message);
   
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



