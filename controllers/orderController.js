const {Product}=require('./../models/productModel')
exports.orderProduct=async (req,res)=>{
    const query=req.query;
    const product=await Product.findOne(query)
    return res.render('orderProduct',{product})
}