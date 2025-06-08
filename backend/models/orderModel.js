const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items:Object,
  amount:Number,
  address:Object,
  status:{type:String,default:"Food Processing"},
  date:{type:Date,default:Date.now()},
  payment:{type:Boolean,default:false},
}); 

module.exports = mongoose.model('order', orderSchema);
