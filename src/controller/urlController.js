const { nanoid } =require("nanoid");
const { urlModel } = require("../model/urlModel");


// const renderHome=(req, res)=>{
//   res.render('')
// }


const generateShortId=async(req, res)=>{
  const {url}=req.body;
  const shortID= nanoid(6);
  try{
   const urlDoc=await urlModel.create({
    urlShortId:shortID,
    urlFull:url,
    visits:[] });
    
    return res.status(201).render('home',({id:shortID}))
}catch(err){
   return res.status(500).json({message:'something went wrong',error: err})
}
}
const viewURL=(req, res)=>{
    try{
      const URLlist=urlModel.find({urlFull,urlShortId})
      res.render('URL',({URL:URLlist}))
    }catch(err){
      return res.status(500).json({message:'something went wrong',error: err})
    }

}

const Analytics=async(req, res)=>{
  const shortid=req.params.shortid;
  const result=await urlModel.findOne({urlShortId:shortid})
  return res.json({
   totalClicks:result.visits.length,
   analytics: result.visits
  })
}

const redirectURL=async(req, res)=>{
  const shortid=req.params.shortid;
  const link=await urlModel.findOneAndUpdate({urlShortId:shortid},{$push:{
    visits:{time:Date.now()}
  }})
  console.log(link)
  res.redirect(link.urlFull)
}


const renderHome=async(req, res)=>{
  const allUrl=await urlModel.find()
  res.render('home', ({urls:allUrl}))
}




module.exports={generateShortId, redirectURL, Analytics,renderHome }