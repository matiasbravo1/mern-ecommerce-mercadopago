const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Cart = mongoose.model('carts');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

	app.get('/api/search_products/:category', async (req, res) => {
		
   	const products = await Product.find({ category: req.params.category });

  	res.send(products);
	});

	app.post('/api/add_product', requireLogin, async (req, res) => {
		//chequear disponibilidad
		//chequear logueado (middleware)
		//chequear si ya existe

		const cart = new Cart({
	      product_id: req.body.product_id,
		  user_id: req.user._id,
		  quantity: req.body.quantity
	    });

		try {
	      const new_cart = await cart.save();
	      res.send(new_cart);
	    } catch (err) {
	      res.status(422).send(err);
	    }
		
   	//const products = await Product.find({ category: req.params.category });
	});

	app.get('/api/create_product', async (req, res) => {
		
	    const product = new Product({
	      name: 'Dulce de Leche',
		  brand: 'La Serenísima',
		  category: 2,
		  subcategory: 2,
		  code: '433344',
		  short_description: 'Dulce de leche repostero.',
		  presentation: '500 gramos',
		  in: 5,
		  out: 0,
		  reserved: 0,
		  price: 120,
		  cost: 85
	    });

	    try {
	      const new_product = await product.save();
	      res.send(new_product);
	    } catch (err) {
	      res.status(422).send(err);
	    }

	});

} 