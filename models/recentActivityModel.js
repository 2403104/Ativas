const mongoose = require('mongoose');

const recentActivitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    activity: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true
            },
            timeStamp: {
                type: Date,
                default: Date.now 
            }
        }
    ]
});


module.exports = mongoose.model('RecentActivity', recentActivitySchema);
