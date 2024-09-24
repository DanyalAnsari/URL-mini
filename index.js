const express = require('express');
const mongoose =require('mongoose');
const path=require('path');
const cookieParser=require('cookie-parser');
require('dotenv').config();

// modules
const rootRoute=require('./routes/rootRoute');
const homeRoute=require( './routes/homeRoutes');
const userRoute=require('./routes/userRoute');
const urlRoute=require( "./routes/urlRoutes");
// values

const PORT=process.env.PORT;
const app=express();

// connection

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('connected',()=>console.log('connection succesfull'));
mongoose.connection.on('error',(err)=>console.log(`database error:${err}`));

//app setting

app.set('views', path.resolve('./src/views'));
app.set('view engine','ejs');

//middlewares

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.staus(500).send('Something went wrong')
})

//Routes

app.use(express.static('public'));
app.use('/', rootRoute);
app.use('/home' , homeRoute);
app.use('/user', userRoute);
app.use('/url', urlRoute);


app.listen(PORT,()=>console.log(`Application started at PORT:${PORT}`));