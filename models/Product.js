const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  brand: String,
  category: Number,
  subcategory: Number,
  code: String,
  short_description: String,
  large_description: String,
  presentation: String,
  in: Number,
  out: Number,
  reserved: Number
});

mongoose.model('products', productSchema);

