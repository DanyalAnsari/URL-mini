const bcrypt=require('bcrypt');
const {User}=require('../src/model/userModel')
const saltRounds=10

const handlePasswordHashing=(password)=>{
    const salt=bcrypt.genSaltSync(saltRounds);
    const hashPassword=bcrypt.hashSync(password,salt);
    return hashPassword;
}

const handlePasswordVerification=async(inputPassword, password)=>{
    const isValid=bcrypt.compareSync(inputPassword, password)
    return isValid
}

module.exports={handlePasswordHashing, handlePasswordVerification}