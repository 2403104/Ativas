const express=require('express')
const homeController=require('./../controllers/homeController');
const router=express.Router();

router.route('/ativasHome')
    .get(homeController.ativasHome)

module.exports=router; 