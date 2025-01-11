const Wishlist=require('./../models/wishlistModel')

const checkWishlistMiddleware = async (req, res, next) => {
    try {
        const userId = req.session.user?._id; 
        if (!userId) {
            req.wishlistProducts = [];
            return next(); 
        }

        const wishlist = await Wishlist.findOne({ userId });
        if (wishlist && wishlist.wishlist.length > 0) {
            req.wishlistProducts = wishlist.wishlist.map(item => item.productId.toString());
            
        } else {
            req.wishlistProducts = [];
        }

        next();
    } catch (err) {
        console.error('Error in wishlist middleware:', err);
        req.wishlistProducts = []; 
        next();
    }
};

module.exports = checkWishlistMiddleware;