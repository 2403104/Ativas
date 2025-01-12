const express=require('express')
const homeController=require('./../controllers/homeController');
const router=express.Router();

router.route('/login/ativasHome')
    .get(homeController.ativasHome)

module.exports=router; 