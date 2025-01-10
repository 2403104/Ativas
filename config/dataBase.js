require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONN_STR,
     {useNewUrlParser: true, useUnifiedTopology: true})
     .then(()=>console.log('Connected to MongoDB Successfully !!'));