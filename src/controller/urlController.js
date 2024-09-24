const { nanoid } =require("nanoid");
const { urlModel } = require("../model/urlModel");

const redirectURL=async(req, res)=>{
  const shortId=req.params.shortId;
  if(!shortId){
     return res.render('error',{error:'Bad Request'})
  }
  try{
    const link=await urlModel.findOneAndUpdate({URLShortId:shortId},{$push:{Visits:{time:Date.now()}}})
    if (!link) {
      return res.status(500).render('error',{error:'Invalid Short-Link'});
    }else{
      return res.redirect(link.FullURL)
    }
  }catch(err){
    console.log(err)
    res.status(500).render('error',{error:'Something Went wrong'})
  }
  }
  

const generateShortId=async(req, res)=>{
  const User=res.locals.user
  const {URL}=req.body;
  const shortID= nanoid(7);
  try{
   const urlDoc=await urlModel.create({
    URLShortId:shortID,
    FullURL:URL,
    UserID:User._id,
    Visits:[] });
    return res.status(201).redirect('/home/dashboard')
}catch(err){
   return res.status(500).render('error',{error:'Something went wrong'})
}
}

const viewURL=async(req, res)=>{
  const User=res.locals.user
    try{
      const URLlist= await urlModel.find({UserID:User._id})
      return res.render('userPage',{data:URLlist, user:User })
    }catch(err){
      console.log(err)
      return res.status(500).render('error',{error:'something went wrong'})
    }

}

const Analytics=async(req, res)=>{
  const user=res.locals.user
  
  if(user.User_Role ==='ADMIN'){
    try{
      const records=await urlModel.find().populate('UserID').exec()
      return res.render('userPage',{data:records,user:user})
    }catch(err){
      console.log(err)
      return res.status(500).render('error',{error:'something went wrong'})
    }
  }else{
    res.redirect('../')
  }
}




const renderHome=async(req, res)=>{
  const user=res.locals.user;
  if(user){
   return res.render('home',{data:user})
  }
  else{
    return res.render('home')
  }
  
}




module.exports={generateShortId, redirectURL,renderHome,viewURL,Analytics }