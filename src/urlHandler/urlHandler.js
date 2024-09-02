
const urlModel=require('../model/urlModel');

const urlHandler=(req, res, next)=>{
    
    const {url}=req.body;
    if(!{url}){
        res.statue(400).json({message:'Bad Request'})
    }
    else{
       return next();
    }
}
module.exports={urlHandler}