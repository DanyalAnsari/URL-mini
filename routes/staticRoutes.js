const express =require("express");
const router=express.Router();
const{renderHome}=require("../src/controller/urlController")


router.get('/', renderHome);

module.exports=router;