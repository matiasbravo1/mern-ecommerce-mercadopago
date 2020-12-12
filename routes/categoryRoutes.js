const mongoose = require("mongoose");
const Category = mongoose.model("categories");
const Subcategory = mongoose.model("subcategories");

module.exports = (app) => {
	app.get("/api/create_category", async (req, res) => {
		const category = new Category({
			category: "Artículos de Librería",
		});

		try {
			const new_category = await category.save();
			res.send(new_category);
		} catch (err) {
			res.status(422).send(err);
		}
	});
	app.get("/api/create_subcategory", async (req, res) => {
		const subcategory = new Subcategory({
			category_id: "5fd5360f84480014f8aaa88c",
			subcategory: "Aderezos - Condimentos",
		});

		try {
			const new_subcategory = await subcategory.save();
			res.send(new_subcategory);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
