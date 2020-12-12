const mongoose = require("mongoose");
const { Schema } = mongoose;

const subcategorySchema = new Schema({
	category_id: { type: Schema.Types.ObjectId, ref: "categories" },
	subcategory: String,
	show: { type: Boolean, default: true },
	deleted_at: Date,
});

mongoose.model("subcategories", subcategorySchema);
