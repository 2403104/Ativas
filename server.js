require('dotenv').config();
require('./config/dataBase');
const mongoose = require('mongoose');
const express = require('express');

const app=require('./app');
console.log(process.env)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});