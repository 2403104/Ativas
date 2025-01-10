const mongoose=require('mongoose');
const validator=require('express-validator');
const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const User=mongoose.model('User',userSchema);
module.exports=User;