const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  code: String,
  description: String,
  price: { type: Number, default: 0 },
  date_created: { type: Date, default: Date.now }
});

mongoose.model('products', productSchema);

