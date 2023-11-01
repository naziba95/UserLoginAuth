require('dotenv').config();
const express = require('express');
const { send } = require('express/lib/response');
const app = express();
const path = require("path");
const cors = require('cors');
const verifyJWT = require('./Middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./Config/dbCon');
const PORT = process.env.PORT || 3000;
const authRoute = require('./Routes/auth'); //login
const bodyParser = require('body-parser');
const registerRoute = require('./Routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect to MongoDB
connectDB(); 

// built-in midleware to handle urlencoded data in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
 app.use(express.urlencoded({ extended: false })); 

 // built-in middleware for json
 app.use(express.json());

 //middleware for ccokies
// const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Sign on and register route should be accessible without token generation
 app.use('/api/auth', authRoute);
 app.use('/api/register', registerRoute);
 
// routes
app.use('/api/logout', require('./Routes/logout'));  


mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `);
  });
  
})



  