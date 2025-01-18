const Review = require('./../models/reviewModel')
const { Product } = require('./../models/productModel')
const Wishlist = require('./../models/wishlistModel')
const User = require('./../models//userModel')
const mongoose = require('mongoose')
const path = require('path')

const ObjectId = mongoose.Types.ObjectId;


exports.prodInfo = async (req, res) => {
    const name = req.query.name;
    const category = req.query.category;
    const findedProduct = await Product.findOne(req.query);

    const updatedSpecifications = {};
    for (const key in findedProduct.specifications) {
        if (findedProduct.specifications.hasOwnProperty(key)) {
            const newKey = key[0].toUpperCase() + key.slice(1).toLowerCase();
            const value = findedProduct.specifications[key];
            if (typeof value === "string") {
                updatedSpecifications[newKey] = value[0].toUpperCase() + value.slice(1).toLowerCase();
            } else {
                updatedSpecifications[newKey] = value;
            }
        }
    }
    findedProduct.specifications = updatedSpecifications;

    const reviews = await Review.find({ productId: new ObjectId('6777ee3e9f6eddc9566583f2') })
    const wishlistProducts = req.wishlistProducts;
    return res.render('product', { product: findedProduct, reviews: reviews, userId: req.session.user._id, wishlistProducts })
}

exports.prodTypeInfo = async (req, res) => {
    const wishlistProducts = req.wishlistProducts;
    const offerList = ['Discount', 'Cashback', 'Combo', 'Free Shipping', 'Buy One Get One']

    const brand = req.query.brand;
    const category = req.query.category;
    const totalQuery = req.query;
    for (const key in totalQuery) {
        try {
            const decodedKey = decodeURIComponent(key);
            if (decodedKey !== key) {
                totalQuery[decodedKey] = totalQuery[key];
                delete totalQuery[key];
            }
        } catch (error) {
            console.error(`Error decoding key "${key}":`, error);
        }
    }

    if (totalQuery['4andAboveRating'] === 'true') {
        totalQuery['seller.rating'] = { $gte: 4 };
        delete totalQuery['4andAboveRating'];
    }
    if (totalQuery['3andAboveRating'] === 'true') {
        totalQuery['seller.rating'] = { $gte: 3 };
        delete totalQuery['3andAboveRating'];
    }
    if (totalQuery['40PercentOrMoreDiscount'] === 'true') {
        totalQuery['price.discountPercentage'] = { $gte: 40 };
        delete totalQuery['40PercentOrMoreDiscount'];
    }
    if (totalQuery['30PercentOrMoreDiscount'] === 'true') {
        totalQuery['price.discountPercentage'] = { $gte: 30 };
        delete totalQuery['30PercentOrMoreDiscount'];
    }
    if (totalQuery['20PercentOrMoreDiscount'] === 'true') {
        totalQuery['price.discountPercentage'] = { $gte: 20 };
        delete totalQuery['20PercentOrMoreDiscount'];
    }
    if (totalQuery['10PercentOrMoreDiscount'] === 'true') {
        totalQuery['price.discountPercentage'] = { $gte: 10 };
        delete totalQuery['10PercentOrMoreDiscount'];
    }
    if (totalQuery['excludeOutOfStock'] === 'true') {
        totalQuery['availability'] = 'In Stock';
        delete totalQuery['excludeOutOfStock'];
    }
    if (totalQuery.min) {
        const minPrice = parseInt(totalQuery.min, 10);
        if (!isNaN(minPrice)) {
            totalQuery['price.discountedPrice'] = totalQuery['price.discountedPrice'] || {};
            totalQuery['price.discountedPrice'].$gte = minPrice;
        }
        delete totalQuery.min;
    }

    if (totalQuery.max) {
        const maxPrice = parseInt(totalQuery.max, 10);
        if (!isNaN(maxPrice)) {
            totalQuery['price.discountedPrice'] = totalQuery['price.discountedPrice'] || {};
            totalQuery['price.discountedPrice'].$lte = maxPrice;
        }
        delete totalQuery.max;
    }
    if (totalQuery['offerType']) {
        totalQuery['availableOffers'] = { $in: [totalQuery['offerType']] };
        delete totalQuery['offerType'];
    }
    for (let offer of offerList) {
        if (totalQuery[offer] === 'true') {
            totalQuery['availableOffers'] = {
                $elemMatch: {
                    offerType: offer
                }
            };
            delete totalQuery[offer];
        }
    }

    const categoryProduct = await Product.find({ category })
    const allProduct = await Product.find(totalQuery)

    const catProds = categoryProduct.map((prod) => {
        const updatedSpecifications = {};
        for (const key in prod.specifications) {
            if (prod.specifications.hasOwnProperty(key)) {
                const newKey = key[0].toUpperCase() + key.slice(1).toLowerCase();
                const value = prod.specifications[key];
                if (typeof value === "string") {
                    updatedSpecifications[newKey] = value[0].toUpperCase() + value.slice(1).toLowerCase();
                } else {
                    updatedSpecifications[newKey] = value;
                }
            }
        }
        prod.specifications = updatedSpecifications;
        return prod;
    });




    return res.render('productType', { products: allProduct, offerList, categoryProduct: catProds, wishlistProducts, userId: req.session.user._id })
}

exports.addWishlist = async (req, res) => {
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
            user.wishlist.pull({ productId });
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

exports.getRandomImage = async (req, res) => {
    const data = await Product.find({ category: 'Phone' })
    const imgList = data.map((prod) => {
        return prod.images[0];
    })
    return res.status(200).json({ images: imgList })
};
exports.wishlistProdInfo = async (req, res) => {
    const wishlistIds = await Wishlist.findOne({ userId: req.session.user._id });
    const wishlistProducts = wishlistIds.wishlist;
    const wishlist = await Promise.all(
        wishlistProducts.map(async (item) => {
            const product = await Product.findOne(item.productId);
            return product
        })
    )
    return res.render('wishlistProducts', { wishlistProducts: wishlist })
}