import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions';
import Product from './Product';
import './Main.css';

const Products = props => {
	const products = useSelector(store => store.products);
	const dispatch = useDispatch();
	const category = props.match.params.category;

	useEffect(() => {		
        dispatch(fetchProducts(category));
    }, [ category, dispatch ]);

	const renderContent = () => {
		if (products.length !== 0){
			return products.map( product => { return product.name});
		}else{
			return "No hay productos.";
		}
	}

	return(
		<div className='main-wrapper'> 
        <h2>Categoria: { category } </h2>
        <h2>{renderContent()}</h2>
        <Product />
      </div>
	);

}

export default Products;


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchProducts } from '../actions';
// import './Main.css';

// class Products extends Component {

// 	componentDidUpdate(prevProps){
// 		if (prevProps.match.params.category !== this.props.match.params.category){
// 			this.props.fetchProducts(this.props.match.params.category);
// 		}
// 	}

// 	componentDidMount(){
// 		this.props.fetchProducts(this.props.match.params.category);
// 	}

// 	renderContent(){
// 		if (this.props.products){
// 			return this.props.products.map( product => { return product.name});
// 		}else{
// 			return "No hay productos.";
// 		}
// 	}

// 	render(){

// 		console.log(this.props.products);

// 		return(
// 			<div className='main-wrapper'> 
//             <h2>Categoria: { this.props.match.params.category } </h2>
//             <h2>{ this.renderContent() }</h2>
//           </div>
// 		);
// 	}
// }

// function mapStateToProps({ products }) {
//   return { products };
// }

// export default connect(mapStateToProps, { fetchProducts })(Products);

