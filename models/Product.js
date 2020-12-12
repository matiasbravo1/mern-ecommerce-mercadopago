const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  brand: String,
  category_id: { type: Schema.Types.ObjectId, ref: "categories" },
  subcategory_id: { type: Schema.Types.ObjectId },
  code: String,
  short_description: String,
  large_description: String,
  presentation: String,
  in: Number,
  out: Number,
  reserved: Number,
  price: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  show: { type: Boolean, default: true },
  date_created: { type: Date, default: Date.now },
  deleted_at: Date,
});

mongoose.model("products", productSchema);
