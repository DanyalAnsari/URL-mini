const express = require('express');
const {mongoConnection}=require("./src/connections/mongoConnection.js");
const urlRoutes=require( "./routes/urlRoutes");
const staticRoute=require( "./routes/staticRoutes");
const path=require('path');

// module

const URL='mongodb://127.0.0.1:27017/urlShortDB';
const PORT=8080;

// values

mongoConnection(URL);

// connection


const app=express();
app.set('views', path.resolve('./src/views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/url', urlRoutes);
app.use('/' , staticRoute);

//app setting



app.listen(PORT,()=>console.log(`application started at PORT:${PORT}`));