const mongoose = require("mongoose");
const Category = mongoose.model("categories");

module.exports = (app) => {
	app.get("/api/create_category", async (req, res) => {
		const category = new Category({
			order: 1,
			category: "Alimentos",
			subcategories: [
				{ subcategory: "Aderezos - Condimentos" },
				{ subcategory: "Bebidas - Jugos" },
				{ subcategory: "Caldos - Sopas" },
				{ subcategory: "Cereales - Harinas" },
				{ subcategory: "Congelados" },
				{ subcategory: "Conservas" },
				{ subcategory: "Fiambres" },
				{ subcategory: "Fideos" },
				{ subcategory: "Frutas y Verduras" },
				{ subcategory: "Galletas" },
				{ subcategory: "Golosinas" },
				{ subcategory: "Infusiones" },
				{ subcategory: "Lácteos" },
				{ subcategory: "Panificados - Repostería" },
				{ subcategory: "Postres" },
				{ subcategory: "Snacks" },
			],
		});

		try {
			const new_category = await category.save();
			res.send(new_category);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.get("/api/fetch_categories", async (req, res) => {
		const query = { show: true };

		const categories = await Category.find(query).sort({ order: "asc" });

		res.send(categories);
	});
};
