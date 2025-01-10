const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const {Product}=require('./models/productModel');
const Review=require('./models/reviewModel');
require('dotenv').config();
const path=require('path');
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const authRouter=require('./routes/authRouter');
const ativasHomeRouter=require('./routes/ativasHomeRouter')
const cartRouter=require('./routes/cartRouter')
const searchRouter=require('./routes/searchRouter');

const authController=require('./controllers/authController')
const searchController=require('./controllers/searchController')

const populateCardProduct=require('./middlewares/populateCardProduct')
const authenticatedMiddleware=require('./middlewares/authMiddleware');
const suggestionMiddleware=require('./middlewares/suggestionMiddleware');
let app=express();

app.set('view engine','ejs');

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret:'ankitkumar1234',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:false
    }
}))
app.use(populateCardProduct)

app.set('views', path.join(__dirname, 'views')); 

app.get('/product',async (req,res)=>{
    const name=req.query.name;
    const category=req.query.category;
    const findedProduct=await Product.findOne({name,category});
    const reviews=await Review.find({productId:new ObjectId('6777ee3e9f6eddc9566583f2')})
    console.log(reviews)
    return res.render('product',{product:findedProduct,reviews})
})

app.get('/productType',async (req,res)=>{
    const offerList=['Discount','Cashback','Combo','Free Shipping','Buy One Get One']

    const brand=req.query.brand;
    const category=req.query.category;
    // console.log(brand,category)
    const totalQuery=req.query;
    const categoryProduct=await Product.find({category})
    const allProduct=await Product.find(totalQuery)

    
    return res.render('productType',{products:allProduct,offerList,categoryProduct})
})
app.get('/orderProduct',(req,res)=>{
    return res.render('order')
})

app.use('/auth',authRouter)
app.use(authenticatedMiddleware);
app.use('/login',ativasHomeRouter)
app.use('/',cartRouter)
app.use('/',suggestionMiddleware,searchRouter)

module.exports=app;