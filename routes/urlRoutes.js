const express =require("express");
const {urlHandler}=require('../src/urlHandler/urlHandler');
const {generateShortId, redirectURL, Analytics}=require("../src/controller/urlController")
const router=express.Router();

router.get('/:shortid', redirectURL)

router.get('/getAnalytics/:shortid', Analytics)

router.post('/',urlHandler ,generateShortId )

// router.get('/', renderHome)

module.exports=router;