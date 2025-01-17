const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Product } = require('./models/productModel');
const Review = require('./models/reviewModel');
const User = require('./models/userModel')
const Wishlist = require('./models/wishlistModel')
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const ejs=require('ejs')


const authRouter = require('./routes/authRouter');
const ativasHomeRouter = require('./routes/ativasHomeRouter')
const cartRouter = require('./routes/cartRouter')
const searchRouter = require('./routes/searchRouter');
const productRouter=require('./routes/productRouter')
const activityRouter=require('./routes/activityRouter')
const orderRouter=require('./routes/orderRouter')

const authController = require('./controllers/authController')
const searchController = require('./controllers/searchController')
const activityController=require('./controllers/activityController')

const populateCardProduct = require('./middlewares/populateCardProduct')
const authenticatedMiddleware = require('./middlewares/authMiddleware');
const suggestionMiddleware = require('./middlewares/suggestionMiddleware');
const checkWishlistMiddleware = require('./middlewares/wishlistMiddleware')
const wishlistModel = require('./models/wishlistModel');
let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'ankitkumar1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: false
    }
}))
app.use((req, res, next) => {
    if (req.method === 'GET') {
        let prodPath = 'AtivasHome';
        const query = req.query;

        if (query['category']) {
            prodPath += `<${query['category']}`;
        }
        if (query['brand']) {
            prodPath += `<${query['brand']}`;
        }
        if (query['name']) {
            prodPath += `<${query['name']}`;
        }

        req.prodPath=prodPath
    }
    next();
});

app.use(populateCardProduct)

// const calculateDiscountedPercentage = (price) => {
//     if (price.originalPrice > 0) {
//         return ((price.originalPrice - price.discountedPrice) / price.originalPrice) * 100;
//     }
//     return 0;
// };

// const saveDiscountedPercentageMiddleware = async (req, res, next) => {
//     try {
//         const products = await Product.find({brand:'Samsung'}); 
        
//         for (let product of products) {
//             if (product.price && product.price.discountedPrice && product.price.originalPrice) {
//                 const discountedPercentage = calculateDiscountedPercentage(product.price);
//                 product.price.discountPercentage= Math.round(discountedPercentage);
//                 await product.save(); 
//             }
//         }

//         next(); 
//     } catch (error) {
//         console.error("Error saving discounted percentage:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };
// app.use(saveDiscountedPercentageMiddleware);
app.set('views', path.join(__dirname, 'views'));


app.use('/',authRouter,authenticatedMiddleware,ativasHomeRouter,productRouter,cartRouter,
    suggestionMiddleware,searchRouter,activityRouter,orderRouter
)



module.exports = app;