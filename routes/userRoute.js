const router=require('express').Router();
const { isAuthenticated } = require('../src/middleware/authMIddleware');
const {renderLoginView,renderRegistrationView,handleLogin,handleRegistration,handleLogOut, handleUserDeletion}=require('../src/controller/userController')

router.get('/signup', renderRegistrationView);
router.get('/signin', renderLoginView);
router.get('/signout',isAuthenticated,handleLogOut)
router.post('/signup',handleRegistration);
router.post('/signin',handleLogin);
router.delete('/',isAuthenticated,handleUserDeletion);

module.exports=router