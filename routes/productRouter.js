const express=require('express')
const router=express.Router()
const productController=require('./../controllers/productController')
const checkWishlistMiddleware=require('./../middlewares/wishlistMiddleware')

router.route('/product')
    .get(checkWishlistMiddleware,productController.prodInfo)
router.route('/productType')
    .get(checkWishlistMiddleware,productController.prodTypeInfo)
router.route('/addToWishlist')
    .post(productController.addWishlist)
router.route('/randomImage')
    .get(productController.getRandomImage)
router.route('/wishlistProducts')
    .get(productController.wishlistProdInfo)
router.route('/prodFromPath')
    .get(productController.productFromPath)


module.exports=router;