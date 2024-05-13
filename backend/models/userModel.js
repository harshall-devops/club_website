const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Schema for storing the data of users (admin & presidents)
const userSchema = new mongoose.Schema({
  clubname: {
    type: String,
    unique: true
  },
  username:{
    type:String
  },
  password: {
    type: String,
    minlength: 6,
  },
  president: {
    type: String
  },
  prn: {
    type: Number,
  },
  gender: {
    type: String
  },
  classname: {
    type: String
  },
  dob: {
    type: Date
  },
  presidentEmail: {
    type: String
  },
  contact: {
    type: Number
  },
  role: {
    type: String
  },
  status:{
    type:Boolean
  },
  passwordChangeCount:{
     type: Number, default: 0 
    },
  lastPasswordChangeTimestamp: { 
    type: Date, default: Date.now
   },
   wrongPasswordEntryCount:{
    type: Number, default: 0
   },
   wrongPasswordEntryTimeStamp:{
    type: Date, default: Date.now
   },
   initialLogin:{
    type:Boolean,
    default:true
   }
});


const User = new mongoose.model("users", userSchema);
module.exports = User;