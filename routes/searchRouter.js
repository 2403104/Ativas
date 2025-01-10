const express = require('express');
const searchController = require('./../controllers/searchController');


const router = express.Router();

router.route('/input')
    .post(searchController.getSuggestion)

module.exports=router;