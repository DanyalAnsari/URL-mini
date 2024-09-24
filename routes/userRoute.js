const router=require('express').Router();
const {isValidLoginInput}=require('../src/middleware/validation');
const { isAuthenticated } = require('../src/middleware/authMIddleware');
const {renderLoginView,renderRegisterationView,handleLogin,handleRegisteration,handleLogOut, handleUserDeletion}=require('../src/controller/userController')

router.get('/signup', renderRegisterationView);
router.get('/signin', renderLoginView);
router.get('/signout',isAuthenticated,handleLogOut)
router.post('/signup', handleRegisteration);
router.post('/signin',isValidLoginInput, handleLogin);
router.delete('/',isAuthenticated,handleUserDeletion)

module.exports=router