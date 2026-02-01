// to change from require to import just add type module to package.json

// --> follow exact stucture in this main server file
// 1. import dependencies
// 2. add middlewares
// 3. connect DB (2 & 3 can be interchanged bcz server has not started yet but confirm )
// 4. defines routes
// 5. global error handling
// 6. start server


// require('dotenv').config();
import dotenv from 'dotenv';  // -> same as require('dotenv')
dotenv.config();

// const express = require('express');
import express from 'express';
// const cors = require('cors');
import cors from 'cors';
// const connectDB = require('./config/db');
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express();

// Middleware
app.use(cors()); // cors-> all allowed, specfic port is given
app.use(express.json());

// Connect to MongoDB
connectDB();

// define routes
app.use('/api/auth', authRoutes); //-> dont know whether login, signup, delete, to knpw check authroutes
app.use('/api/todos', todoRoutes);
// app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




/*
CRUD
C -> CREATE -> POST
R -> READ -> GET
U -> UPDATE -> PUT/PATCH
  PUT -> even 1 attribute changed, but in db all attributes are updated
  PATCH -> only udpates the value changes
D -> DELETE -> DELETE
*/

