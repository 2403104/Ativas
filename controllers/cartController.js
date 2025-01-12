const Cart=require('./../models/cartModel');
const {Product}=require('./../models/productModel');
const Review=require('./../models/reviewModel');
const mongoose=require('mongoose')

exports.addProductToCart=async  (req,res)=>{
    try{
        const {productId}=req.body;
        const userId=req.session.user._id;
        let cartExistAlready=await Cart.findOne({userId});

        if (!cartExistAlready){
            cartExistAlready=new Cart({
                userId,
                items:[{productId}]
            })
            cartExistAlready.save();
            return res.status(201).json({ message: 'Product added to cart' });
        }
        const productExists = cartExistAlready.items.some(item => item.productId.toString() === productId);

        if (productExists) {
            return res.status(400).json({ message: 'Product is already in the cart' });
        }
        cartExistAlready.items.push({productId});
        cartExistAlready.save();
        return res.status(200).json({ message: 'Product added to cart' });



    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.getCartInterface = async (req, res) => {
    try {
        if (!req.session || !req.session.user || !req.session.user._id) {
            return res.status(400).send('User session is missing.');
        }

        const cartProd = await Cart.findOne({ userId: req.session.user._id });
        if (!cartProd || !cartProd.items || !Array.isArray(cartProd.items)) {
            return res.render('viewCart', { cartProd: [] }); // Render empty cart if no cart or items
        }
        const productDetails = await Promise.all(
            cartProd.items.map(async (item) => {
                const prod = await Product.findOne({ _id: item.productId });
                if (!prod) {
                    throw new Error(`Product with ID ${item.productId} not found.`);
                }
                return { ...prod._doc, quantity: item.quantity };
            })
        );

        return res.render('viewCart', { cartProd: productDetails });

    } catch (error) {
        console.error('Error fetching cart interface:', error.message);
        return res.status(500).send('An error occurred while fetching the cart.');
    }
};
const ObjectId = mongoose.Types.ObjectId;
exports.reviewsAndRatings = async (req, res) => {
    const review = {
        productId: new ObjectId('6777ee3e9f6eddc9566583f2'),
        userId: new ObjectId('677bb1e4292183279d3b7cfb'),
        rating: 4,
        description: "This product is amazing! Highly recommend to everyone. Great value for the price. Will definitely buy again."
    };

    try {
        const added = await Review.create(review);
        return res.send("Review added successfully");
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).send("An error occurred while adding the review.");
    }
};
