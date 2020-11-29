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
		//Check existence
		const product = await Product.findById(req.body.product_id);
	    
	    if (!product){
	    	res.send({ error: 'El producto ya no existe.' });
	    	return;
	    }

	    //Check avaibility
	    const avaible = product.in - product.out - product.reserved;
	    
	    if (avaible < req.body.quantity){
	    	res.send({ error: 'El producto ya no posee stock suficiente.' });
	    	return;
	    }

	    //Check if already in Cart
		const productInCart = await Cart.find({ user_id: req.user._id, product_id: req.body.product_id }).exec();
		
		if (productInCart.length != 0){
	    	res.send({ error: 'El producto ya fue agregado anteriormente.' });
	    	return;
	    }

	    //Add to Cart
		const cart = new Cart({
	      product_id: req.body.product_id,
		  user_id: req.user._id,
		  quantity: req.body.quantity
	    });

		try {
	      const new_cart = await cart.save();
	    } catch (err) {
	      res.send({ error: err });
	      return;
	    }
		
		//Find and Populate Cart Products
		const cart_products = await Cart.find({ user_id: req.user._id }).populate('product_id').exec();
		res.send(cart_products);

	});

	app.get('/api/fetch_cart', requireLogin, async (req, res) => {
		const cart_products = await Cart.find({ user_id: req.user._id }).populate('product_id').exec();
		res.send(cart_products);
	});

	app.get('/api/create_product', async (req, res) => {
		
	    const product = new Product({
	      name: 'Manteca',
		  brand: 'La Tonadita',
		  category: 1,
		  subcategory: 2,
		  code: '433344',
		  short_description: 'La mejor.',
		  presentation: '200 gramos',
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