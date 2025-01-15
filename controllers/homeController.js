const { Product } = require('./../models/productModel');
const recentActivity = require('./../models/recentActivityModel');
const Cart = require('./../models/cartModel');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.ativasHome = async (req, res) => {
  const cartProducts = await Cart.findOne({ userId: req.session.user._id })

  //RECENT PRODUCT
  const recentActProd = await recentActivity.findOne({ userId: req.session.user._id })
  let recentActivityProd = [];
  if (recentActProd && recentActProd.activity) {
    const limitedActivity = recentActProd.activity.slice(0, 8)
    recentActivityProd = await Promise.all(
      limitedActivity.map(async (prod) => {
        return await Product.findOne({ _id: prod.productId });
      })
    );
  }

  //RECOMMENDED PRODUCT
  let prod = []
  const recent = recentActProd.activity;
  prod = await Promise.all(
    recent.map(async (prod) => {
      const finded = await Product.findOne({ _id: prod.productId });
      return finded.brand
    })
  )
  const brands = [...new Set(prod)]

  let recProd = []
  recProd = await Promise.all(
    brands.map(async (brand) => {
      const prodFinded = await Product.findOne({ brand })
      return prodFinded
    })
  )
  const prods = recProd.slice(0, 11)


  //LOCKET PRODUCT
  const locketProd = await Product.find({ category: 'Locket' })
  const LocketProd = [];
  const brandNames = new Set();

  for (const product of locketProd) {
    if (!brandNames.has(product.brand)) {
      LocketProd.push(product);
      brandNames.add(product.brand);
    }
    if (LocketProd.length === 4) break;
  }

  //SPORTS PRODUCT
  const sportProd=await Product.find({category:'Sport'});
  const SportProd=[];
  const sportProductBrand=new Set();
  for (const product of sportProd){
    if (!sportProductBrand.has(product.brand)){
      SportProd.push(product)
      sportProductBrand.add(product.brand);
    }
    if (SportProd.length==4) break;
  }

  //EARBUDS PRODUCTS
  const earbudsProd=await Product.find({category:'Bluetooth Earbuds'});
  const EarbudsProd=[];
  const earbudsProdBrand=new Set();
  for (const product of earbudsProd){
    if (!earbudsProdBrand.has(product.brand)){
      EarbudsProd.push(product)
      earbudsProdBrand.add(product.brand);
    }
    if (EarbudsProd.length==4) break;
  }

  return res.render('ativasHome', {LocketProd,recentActivityProd,recProd:prods,LocketProd,SportProd,EarbudsProd});
}