const {isAuthenticated}=require('../src/middleware/authMIddleware');
const { renderHome, viewURL }=require("../src/controller/urlController");
const userRoute=require('./userRoute');
const express =require("express");
const router=express.Router();

//****ROUTES*****

router.get('/', isAuthenticated ,renderHome);

router.get('/home', isAuthenticated ,renderHome);

router.get('/home/dashboard',isAuthenticated,viewURL);

module.exports=router;