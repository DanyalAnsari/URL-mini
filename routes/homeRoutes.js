const express =require("express");
const router=express.Router();
const{viewURL, generateShortId, Analytics}=require("../src/controller/urlController");
const { isAuthenticated } = require("../src/middleware/authMIddleware");



router.get('/check',isAuthenticated,Analytics);

router.get('/dashboard',isAuthenticated,viewURL)

router.post('/dashboard/',isAuthenticated,generateShortId)

module.exports=router;