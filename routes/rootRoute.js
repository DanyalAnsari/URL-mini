const express =require("express");
const {isAuthenticated}=require('../src/middleware/authMIddleware')
const { redirectURL, renderHome}=require("../src/controller/urlController");
const router=express.Router();

router.get('/:shortId',redirectURL);

router.get('/', isAuthenticated ,renderHome);

module.exports=router;