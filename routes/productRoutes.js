const mongoose = require('mongoose');
const Product = mongoose.model('products');

module.exports = app => {

	app.get('/api/search_products/:category', async (req, res) => {
		
	   	const products = await Product.find({ category: req.params.category });

    	res.send(products);
  	});

	app.get('/api/create_product', async (req, res) => {
		
	    const product = new Product({
	      name: 'Aceite',
	      code: '44444',
	      description: 'De Girasol',
	      price: 56
	    });

	    try {
	      const new_product = await product.save();
	      res.send(new_product);
	    } catch (err) {
	      res.status(422).send(err);
	    }

	});

} 