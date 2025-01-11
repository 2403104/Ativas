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


const authRouter = require('./routes/authRouter');
const ativasHomeRouter = require('./routes/ativasHomeRouter')
const cartRouter = require('./routes/cartRouter')
const searchRouter = require('./routes/searchRouter');
const productRouter=require('./routes/productRouter')

const authController = require('./controllers/authController')
const searchController = require('./controllers/searchController')

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
app.use(populateCardProduct)

app.set('views', path.join(__dirname, 'views'));

app.get('/wishlistProducts',async(req,res)=>{
    const wishlistIds=await Wishlist.findOne({userId:req.session.user._id});
    const wishlistProducts=wishlistIds.wishlist;
    const wishlist=await Promise.all(
        wishlistProducts.map(async(item)=>{
            const product=await Product.findOne(item.productId);
            return product
        })
    )
    return res.render('wishlistProducts',{wishlistProducts:wishlist})
})
app.use('/auth', authRouter)
app.use(authenticatedMiddleware);
app.use('/login', ativasHomeRouter)
app.use('/',productRouter)
app.use('/', cartRouter)
app.use('/', suggestionMiddleware, searchRouter)

module.exports = app;