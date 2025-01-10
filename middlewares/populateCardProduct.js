const Cart = require('./../models/cartModel');

const populateCartProducts = async (req, res, next) => {
    if (req.session.user) {
        try {
            const cart = await Cart.findOne({ userId: req.session.user._id });
            res.locals.cartProducts = cart ? cart.items : []; 
        } catch (error) {
            console.error('Error fetching cart products:', error);
            res.locals.cartProducts = [];
        }
    } else {
        res.locals.cartProducts = [];
    }
    next();
};

module.exports = populateCartProducts;
