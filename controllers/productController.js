const Review=require('./../models/reviewModel')
const {Product}=require('./../models/productModel')
const Wishlist=require('./../models/wishlistModel')
const User=require('./../models//userModel')
const mongoose=require('mongoose')
const path=require('path')

const ObjectId = mongoose.Types.ObjectId;


exports.prodInfo=async (req, res) => {
    const name = req.query.name;
    const category = req.query.category;
    const findedProduct = await Product.findOne({ name, category });
    const reviews = await Review.find({ productId: new ObjectId('6777ee3e9f6eddc9566583f2') })
    const wishlistProducts = req.wishlistProducts;
    return res.render('product', { product: findedProduct, reviews, userId: req.session.user._id, wishlistProducts })
}

exports.prodTypeInfo= async (req, res) => {
    const offerList = ['Discount', 'Cashback', 'Combo', 'Free Shipping', 'Buy One Get One']

    const brand = req.query.brand;
    const category = req.query.category;
    const totalQuery = req.query;
    const categoryProduct = await Product.find({ category })
    const allProduct = await Product.find(totalQuery)


    return res.render('productType', { products: allProduct, offerList, categoryProduct })
}

exports.addWishlist= async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).send('User ID and Product ID are required');
    }

    try {
        let user = await Wishlist.findOne({ userId });

        if (!user) {
            user = new Wishlist({
                userId,
                wishlist: [{ productId }]
            });
            await user.save(); 
            return res.status(200).json({ success: true, message: 'Product added to wishlist!!' });
        }

        if (user.wishlist.some(item => item.productId.toString() === productId.toString())) {
            user.wishlist.pull({productId});
            await user.save();
            return res.status(400).json({ success: true, message: 'Product removed from wishlist' });
        }

        user.wishlist.push({ productId });
        await user.save();  

        return res.status(200).json({ success: true, message: 'Product added to wishlist!!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error!!" });
    }
}
exports.orderProduct=(req,res)=>{
    return res.render('order')
}
// exports.wishlistProducts=(req,res)=>{
//     return res.render('wishlistProducts')
// }