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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
