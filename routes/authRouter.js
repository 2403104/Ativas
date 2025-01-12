const express=require('express')
const router=express.Router();

const authController=require('./../controllers/authController')

router.route('/auth/login')
    .get(authController.login)
    .post(authController.verifyLogin)
    
router.route('/auth/signup')
    .get(authController.signup)
    .post(authController.registerAccount)

router.route('/auth/logout')
    .post(authController.logout)

router.route('/auth/forgotPassword')
    .get(authController.fpInterface)
    .post(authController.forgotPassword)

router.route('/auth/reset-password/:token')
    .get(authController.rpInterface)
    .post(authController.resetPassword);
    
module.exports=router;  