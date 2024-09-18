const express = require('express');
const mongoose =require("mongoose");
const path=require('path');
require('dotenv').config();

// module
const staticRoute=require( "./routes/staticRoutes");
const userRoute=require('./routes/userRoute')
const urlRoute=require( "./routes/urlRoutes");
// values

const PORT=8080;
const app=express();

// connection

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('connected',()=>console.log('connection succesfull'));
mongoose.connection.on('error',(err)=>console.log(`database error:${err}`));

//app setting

app.set('views', path.resolve('./src/views'));
app.set('view engine','ejs');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/' , staticRoute);
app.use('/user', userRoute);
app.use('/urls', urlRoute);


app.listen(PORT,()=>console.log(`application started at PORT:${PORT}`));