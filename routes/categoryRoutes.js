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

	app.get("/api/many_categories", async (req, res) => {
		const categories = [
			{
				order: 1,
				category: "Category 1",
				subcategories: [
					{ subcategory: "Subcategory 1" },
					{ subcategory: "Subcategory 2" },
					{ subcategory: "Subcategory 3" },
				],
			},
			{
				order: 2,
				category: "Category 2",
				subcategories: [
					{ subcategory: "Subcategory 4" },
					{ subcategory: "Subcategory 5" },
					{ subcategory: "Subcategory 6" },
				],
			},
			{
				order: 3,
				category: "Category 3",
				subcategories: [
					{ subcategory: "Subcategory 7" },
					{ subcategory: "Subcategory 8" },
					{ subcategory: "Subcategory 9" },
				],
			},
		];

		try {
			const new_category = await Category.insertMany(categories);
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
