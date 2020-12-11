const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	name: String,
	surname: String,
	cart: [
		{
			product_id: { type: Schema.Types.ObjectId, ref: "products" },
			quantity: Number,
		},
	],
});

mongoose.model("users", userSchema);
