const express=require('express')
const router=express.Router()
const activityController=require('./../controllers/activityController')

router.route('/user/recentActivity')
    .post(activityController.recentActivity)

module.exports=router