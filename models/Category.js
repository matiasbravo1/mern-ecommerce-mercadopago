const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
	category: String,
	show: { type: Boolean, default: true },
	deleted_at: Date,
});

mongoose.model("categories", categorySchema);
