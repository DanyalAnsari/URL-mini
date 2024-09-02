const mongoose =require( "mongoose");

const mongoConnection=(URL)=>{
mongoose.connect(URL);
mongoose.connection.once('connected',()=>console.log('connection succesfull'));
mongoose.connection.on('error',(err)=>console.log(`database error:${err}`))
}
module.exports={mongoConnection}