// Use CommonJS syntax instead of ES6 import
const express = require('express');
const mongoose = require('mongoose')
const router= require('../api/routes/userRoute')
const authroute =require('../api/routes/auth');
const listingRouter = require('./routes/listing.route');
const cookieParser = require('cookie-parser');
// const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://heba:hebamohamed@cluster0.f3b3ys4.mongodb.net/mearnproject?retryWrites=true&w=majority&appName=Cluster0') .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
  // const __dirname = path.resolve();
// app.use('/')
app.use(express.json())
app.use(cookieParser());
app.use('/api/user',router)
app.use('/api/auth',authroute)
app.use('/api/listing', listingRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, () => {
    console.log('server is running on port 3000');
});



