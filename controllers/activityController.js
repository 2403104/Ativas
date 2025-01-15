const { Product } = require('../models/productModel');
const recentActivityModel = require('./../models/recentActivityModel');

exports.recentActivity = async (req, res) => {
    try {
        const { activity } = req.body;

        if (!activity || activity.length === 0) {
            return res.status(400).json({ message: 'No activities found' });
        }
        const user = await recentActivityModel.findOne({ userId: req.session.user._id });
        if (!user) {
            const data = {
                userId: req.session.user._id,
                activity: activity
            };
            await recentActivityModel.create(data);
            return res.status(200).json({ message: 'saved as recent activity' });
        } else if (!user.activity.some((act) => act.productId.toString() === activity[0].productId)){
            user.activity.unshift(activity[0]);
            await user.save();
            return res.status(200).json({ message: 'saved as recent activity ' });
        }else{
            return res.status(200).json({ message: 'Already in recent history' });
        }


    } catch (err) {
        console.error('Error logging activities:', err);
        return res.status(500).json({ message: 'Server error while logging activities' });
    }
};

exports.recommendProd=async (req,res)=>{
    try{
        const recent=await recentActivityModel.find({})
        const prod=[]
        prod=await Promise.all(
            recent.map(async (prod)=>{
                const finded=await Product.findOne({_id:prod.productId});
                console.log(finded)
                return [Product.find({brand:finded.brand,category:finded.category})]
            })
        )
        console.log(prod)
    }catch(err){
        console.log(err)
    }
}