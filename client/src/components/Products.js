import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import './Main.css';

class Products extends Component {
	
	render(){
		const { category } = this.props.match.params;

		return(
			<div className='main-wrapper'> 
            <h2>Categoria: { category }</h2>
          </div>
		);
	}
}

export default Products;