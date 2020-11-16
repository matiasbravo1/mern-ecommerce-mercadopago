import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import './Main.css';

class Products extends Component {

	componentDidMount(){
		this.props.fetchProducts(this.props.match.params.category);
	}

	render(){

		console.log(this.props.products);

		return(
			<div className='main-wrapper'> 
            <h2>Categoria: { this.props.match.params.category } </h2>
            
          </div>
		);
	}
}

function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps, { fetchProducts })(Products);