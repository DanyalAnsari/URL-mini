const express =require("express");
const {generateShortId, redirectURL, removeUrlRecord}=require("../src/controller/urlController");
const { isAuthenticated } = require("../src/middleware/authMIddleware");
const router=express.Router();


// router.get('/getAnalytics/:user',isAuthenticated, Analytics)

router.post('/',isAuthenticated,generateShortId);
router.get('/:shortId',redirectURL);
router.delete('/:id', removeUrlRecord)

module.exports=router;