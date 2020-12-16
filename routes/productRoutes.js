const mongoose = require("mongoose");
const Product = mongoose.model("products");
const User = mongoose.model("users");
const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
	app.get("/api/search_products/:category/:subcategory", async (req, res) => {
		const query =
			req.params.category == "all"
				? null
				: {
						category_id: req.params.category,
						subcategory_id: req.params.subcategory,
				  };

		const products = await Product.find(query);

		res.send(products);
	});

	app.post("/api/add_product", requireLogin, async (req, res) => {
		//Check existence
		const product = await Product.findById(req.body.product_id);

		if (product.deleted_at) {
			res.send({ error: "El producto ya no existe." });
			return;
		}

		//Check avaibility
		const avaible = product.in - product.out - product.reserved;

		if (avaible < req.body.quantity) {
			res.send({ error: "El producto ya no posee stock suficiente." });
			return;
		}

		//Check if already in Cart
		const productInCart = await User.findOne({
			_id: req.user._id,
			"cart.product_id": req.body.product_id,
		});

		if (productInCart != null) {
			res.send({ error: "El producto ya fue agregado anteriormente." });
			return;
		}

		//Add to Cart
		const user = await User.findOne({ _id: req.user._id });
		user.cart.push({
			product_id: req.body.product_id,
			quantity: req.body.quantity,
		});

		try {
			const updated = await user.save();
		} catch (err) {
			res.send({ error: err });
			return;
		}

		//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate(
			"cart.product_id"
		);
		res.send(cart.cart);
	});

	app.post("/api/remove_product", requireLogin, async (req, res) => {
		const user = await User.findOne({ _id: req.user._id });

		user.cart.id(req.body.product_id).remove();

		await user.save();

		//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate(
			"cart.product_id"
		);
		res.send(cart.cart);
	});

	app.post("/api/plus_one_product", requireLogin, async (req, res) => {
		//Get cart product
		const user = await User.findOne({ _id: req.user._id });
		const new_quantity = (user.cart.id(req.body.product_id).quantity += 1);

		//Check existence
		const product = await Product.findById(
			user.cart.id(req.body.product_id).product_id._id
		);

		if (product.deleted_at) {
			res.send({ error: "El producto ya no existe." });
			return;
		}

		//Check avaibility
		const avaible = product.in - product.out - product.reserved;

		if (avaible < new_quantity) {
			res.send({ error: "No hay stock suficiente." });
			return;
		}

		await user.save();

		//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate(
			"cart.product_id"
		);
		res.send(cart.cart);
	});

	app.post("/api/minus_one_product", requireLogin, async (req, res) => {
		const user = await User.findOne({ _id: req.user._id });
		user.cart.id(req.body.product_id).quantity -= 1;

		await user.save();

		//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate(
			"cart.product_id"
		);
		res.send(cart.cart);
	});

	app.get("/api/fetch_cart", requireLogin, async (req, res) => {
		const cart = await User.findOne({ _id: req.user._id }).populate(
			"cart.product_id"
		);
		res.send(cart.cart);
	});

	app.get("/api/create_product", async (req, res) => {
		const product = new Product({
			name: "Bananas",
			brand: "Ecuador",
			category_id: "5fd53f486d509b049cab9b90",
			subcategory_id: "5fd53f486d509b049cab9b99",
			code: "25433422",
			short_description: "Nao tem carozo.",
			presentation: "1 kilo",
			in: 10,
			out: 2,
			reserved: 0,
			price: 135,
			cost: 105,
		});

		try {
			const new_product = await product.save();
			res.send(new_product);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.get("/api/many_products", async (req, res) => {
		const products = [
			{
				name: "Product 1",
				brand: "Brand 1",
				category_id: "5fda1cd881244f0017253008",
				subcategory_id: "5fda1cd881244f0017253009",
				code: "code00001",
				short_description: "description00001",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 2",
				brand: "Brand 2",
				category_id: "5fda1cd881244f0017253008",
				subcategory_id: "5fda1cd881244f001725300a",
				code: "code00002",
				short_description: "description00002",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 3",
				brand: "Brand 3",
				category_id: "5fda1cd881244f0017253008",
				subcategory_id: "5fda1cd881244f001725300a",
				code: "code00003",
				short_description: "description00003",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 4",
				brand: "Brand 4",
				category_id: "5fda1cd881244f0017253008",
				subcategory_id: "5fda1cd881244f001725300b",
				code: "code00004",
				short_description: "description00004",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 5",
				brand: "Brand 5",
				category_id: "5fda1cd881244f001725300c",
				subcategory_id: "5fda1cd881244f001725300d",
				code: "code00005",
				short_description: "description00005",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 6",
				brand: "Brand 6",
				category_id: "5fda1cd881244f001725300c",
				subcategory_id: "5fda1cd881244f001725300e",
				code: "code00006",
				short_description: "description00006",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
			{
				name: "Product 7",
				brand: "Brand 7",
				category_id: "5fda1cd881244f001725300c",
				subcategory_id: "5fda1cd881244f001725300e",
				code: "code00007",
				short_description: "description00007",
				presentation: "1 kilo",
				in: 10,
				out: 2,
				reserved: 0,
				price: 135,
				cost: 105,
			},
		];

		try {
			const new_products = await Product.insertMany(products);
			res.send(new_products);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
