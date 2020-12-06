const mongoose = require('mongoose');
const Product = mongoose.model('products');
const User = mongoose.model('users');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

	app.get('/api/search_products/:category', async (req, res) => {
		const query = (req.params.category == 'all') ? null : { category: req.params.category };
	   		
		const products = await Product.find(query);
	  	
	  res.send(products);
	});

	app.post('/api/add_product', requireLogin, async (req, res) => {
		//Check existence
		const product = await Product.findById(req.body.product_id);
	    
    if (product.deleted_at){
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
    const productInCart = await User.findOne( { _id: req.user._id, 'cart.product_id': req.body.product_id });
		
		if (productInCart != null){
    	res.send({ error: 'El producto ya fue agregado anteriormente.' });
    	return;
    }

	 	//Add to Cart
	 	const user = await User.findOne({ _id: req.user._id });
	 	user.cart.push({ product_id: req.body.product_id, quantity: req.body.quantity });

	 	try {
	 		const updated = await user.save();
	 	} catch (err) {
	 		res.send({ error: err });
	 		return;
	 	}
		
		//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate('cart.product_id');
		res.send(cart.cart);

	});

	app.post('/api/remove_product', requireLogin,  async (req, res) => {
		const user = await User.findOne({ _id: req.user._id });

	 	user.cart.id(req.body.product_id).remove();

	 	await user.save();

	 	//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate('cart.product_id');
		res.send(cart.cart);

	});

	app.post('/api/plus_one_product', requireLogin,  async (req, res) => {
		//Get cart product
	  const user = await User.findOne({ _id: req.user._id });
	  const new_quantity = user.cart.id(req.body.product_id).quantity += 1;

		//Check existence
		const product = await Product.findById(user.cart.id(req.body.product_id).product_id._id);
	    
    if (product.deleted_at){
    	res.send({ error: 'El producto ya no existe.' });
    	return;
    }

    //Check avaibility
    const avaible = product.in - product.out - product.reserved;
    
    if (avaible < new_quantity){
    	res.send({ error: 'No hay stock suficiente.' });
    	return;
    }

		await user.save();

	 	//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate('cart.product_id');
		res.send(cart.cart);
	});
	
	app.post('/api/minus_one_product', requireLogin,  async (req, res) => {
		const user = await User.findOne({ _id: req.user._id });
		user.cart.id(req.body.product_id).quantity -= 1;

		await user.save();

	 	//Find and Populate Cart Products
		const cart = await User.findOne({ _id: req.user._id }).populate('cart.product_id');
		res.send(cart.cart);
	});

	app.get('/api/fetch_cart', requireLogin, async (req, res) => {
		const cart = await User.findOne({ _id: req.user._id }).populate('cart.product_id');
		res.send(cart.cart);
	});

	app.get('/api/create_product', async (req, res) => {
		
	    const product = new Product({
	      name: 'Bananas',
		  brand: 'Ecuador',
		  category: 2,
		  subcategory: 2,
		  code: '25433422',
		  short_description: 'Nao tem carozo.',
		  presentation: '1 kilo',
		  in: 10,
		  out: 2,
		  reserved: 0,
		  price: 135,
		  cost: 105
	    });

	    try {
	      const new_product = await product.save();
	      res.send(new_product);
	    } catch (err) {
	      res.status(422).send(err);
	    }

	});

} 