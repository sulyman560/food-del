const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  fileName: String,
});

module.exports = mongoose.model('data', ItemSchema);
