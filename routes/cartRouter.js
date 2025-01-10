const express=require('express');
const cartController=require('./../controllers/cartController');
const router=express.Router();

router.route('/addToCart').post(cartController.addProductToCart);
router.route('/viewCart').get(cartController.getCartInterface);
router.route('/reviewsAndRatings').get(cartController.reviewsAndRatings);
module.exports=router;