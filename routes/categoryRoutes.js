const mongoose = require("mongoose");
const Category = mongoose.model("categories");

module.exports = (app) => {
	app.get("/api/create_category", async (req, res) => {
		const category = new Category({
			category: "Alimentos",
			subcategories: [
				{ subcategory: "Aderezos - Condimentos" },
				{ subcategory: "Bebidas - Jugos" },
				{ subcategory: "Caldos - Sopas" },
			],
		});

		try {
			const new_category = await category.save();
			res.send(new_category);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
