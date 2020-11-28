const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
  product_id: { type: Schema.Types.ObjectId, ref: 'products' },
  quantity: Number,
});

mongoose.model('carts', cartSchema);