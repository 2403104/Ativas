const express=require('express')
const homeController=require('./../controllers/homeController');
const router=express.Router();
const activityController=require('./../controllers/activityController')

router.route('/login/ativasHome')
    .get(homeController.ativasHome)

module.exports=router; 