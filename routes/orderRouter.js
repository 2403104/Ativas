const express=require('express')
const router=express.Router()
const orderController=require('./../controllers/orderController')

router.route('/orderProduct')
    .get(orderController.orderProduct)

module.exports=router