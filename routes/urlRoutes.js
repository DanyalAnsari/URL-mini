const express =require("express");
const {isValidLoginInput}=require('../src/middleware/validation');
const {generateShortId, redirectURL, Analytics}=require("../src/controller/urlController");
const { isAuthenticated } = require("../src/middleware/authMIddleware");
const router=express.Router();


// router.get('/getAnalytics/:user',isAuthenticated, Analytics)

router.post('/',isAuthenticated,generateShortId)

// router.get('/', renderHome)

module.exports=router;