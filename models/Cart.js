const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user_id: String,
  product_id: String,
  quantity: Number,
});

mongoose.model('carts', cartSchema);