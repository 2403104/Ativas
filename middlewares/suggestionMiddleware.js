const { Product } = require('./../models/productModel');
module.exports = async (req, res, next) => {
    const { input } = req.body;

    if (!input || input.trim() === '') {
        req.suggestions = [];
        return next();
    }

    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const normalizedInput = input.trim().toLowerCase();
    const regexInput = new RegExp(escapeRegex(normalizedInput), 'i');

    const products = await Product.aggregate([
        {
            $addFields: {
                exactNameMatch: { $cond: [{ $eq: [{ $toLower: '$name' }, normalizedInput] }, 1, 0] },
                exactBrandMatch: { $cond: [{ $eq: [{ $toLower: '$brand' }, normalizedInput] }, 1, 0] },
                exactCategoryMatch: { $cond: [{ $eq: [{ $toLower: '$category' }, normalizedInput] }, 1, 0] },
            },
        },
        {
            $match: {
                $or: [
                    { name: { $regex: regexInput } },
                    { brand: { $regex: regexInput } },
                    { category: { $regex: regexInput } },
                ],
            },
        },
        {
            $sort: { exactNameMatch: -1, exactBrandMatch: -1, exactCategoryMatch: -1 },
        },
        {
            $limit: 20,
        },
    ]);

    req.suggestions = products;

    next();
};