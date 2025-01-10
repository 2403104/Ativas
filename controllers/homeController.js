const {Product}=require('./../models/productModel');
const Cart=require('./../models/cartModel');
exports.ativasHome=async (req,res)=>{   
    const cartProducts=await Cart.findOne({userId:req.session.user._id})
    return res.render('ativasHome');
}