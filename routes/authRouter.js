const express=require('express')
const router=express.Router();

const authController=require('./../controllers/authController')

router.route('/login')
    .get(authController.login)
    .post(authController.verifyLogin)
    
router.route('/signup')
    .get(authController.signup)
    .post(authController.registerAccount)

router.route('/logout')
    .post(authController.logout)

router.route('/forgotPassword')
    .get(authController.fpInterface)
    .post(authController.forgotPassword)

router.route('/reset-password/:token')
    .get(authController.rpInterface)
    .post(authController.resetPassword);
    
module.exports=router;  