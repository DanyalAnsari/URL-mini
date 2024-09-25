const { User } = require('../model/userModel');
const { handlePasswordHashing, handlePasswordVerification, handleTokenGeneration } = require('../../auth/authentication');
const { urlModel } = require('../model/urlModel');


const renderRegisterationView = (req, res) => {
    res.status(200).render('signup');
}

const renderLoginView = (req, res) => {
    res.status(200).render('signin');
}

const handleRegisteration = async (req, res) => {
    const { Username, Email, Password } = req.body;
    if (!Username | !Email | !Password) {
        return res.status(400).render('signup',{ error: 'All fields required' });
    }
    try {
        const result = await User.findOne({ Email });
        if(result){
            res.render('signup',{error:'User already exist'})
        }
        const hashPassword = handlePasswordHashing(Password)
        const user = await User.create({ Username, Email, Password: hashPassword });
        const token = handleTokenGeneration(user)
        res.status(201).cookie('token',token).redirect('../home/dashboard')
    } catch (err) {
        console.log(err);
        res.status(500).render('signup',{ error:'Something went wrong!' });
    }
}

const handleLogin = async (req, res) => {
    const { Email, Password } = req.body;
    if ( !Email | !Password ) {
        return res.status(400).render('signin',{ error: 'All fields required' });
    }
    try {
        const user = await User.findOne({ Email });
        if (user) {
            const isValid = handlePasswordVerification(Password, user.Password);
            if (isValid) {
                const token = handleTokenGeneration(user)
                return res.status(200).cookie('token', token).redirect('../home/dashboard');
            }
            else {
                return res.status(404).render('signin',{ error: 'Email or Password not valid' });
            }

        } else {
            return res.status(404).render('signin',{ error: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).render('signin',{ error: 'Something went wrong' });
    }
}

const handleLogOut=(req, res)=>{
    try {
      return res.clearCookie('token').redirect('/')
    } catch (error) {
       console.log(error)
      return res.render('error',{error:'Something went wrong'})
    }
}

const handleUserDeletion=async(req, res)=>{
    const user=res.locals.user;
    if(!user){
       return res.status(404).render('error',{error:'User not found or Bad request'});
    }
    try{
        const DeleteUser=await User.findOne({_id:user.id})
        if(User){
            const isDeletedUser=await User.deleteOne({_id:DeleteUser._id});
            if(isDeletedUser){
                const deletedRecords=await urlModel.deleteMany({UserID:isDeletedUser._id})
                return res.redirect('/home');
            }            
        }
        return res.redirect('/home')
    }catch (error) {
        console.log(error)
       return res.redirect('error',{error:'Something went wrong'})
     }
}
module.exports = { renderLoginView, renderRegisterationView, handleLogin, handleRegisteration, handleLogOut, handleUserDeletion };