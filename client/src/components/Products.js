import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions";
import Product from "./Product";
import Modal from "./Modal";
import { Loader, Dimmer } from "semantic-ui-react";
import "./Main.css";
import "./Products.css";

const Products = (props) => {
	const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
	const [shouldDisplayLoader, setShouldDisplayLoader] = useState(false);

	const products = useSelector((store) => store.products);
	const dispatch = useDispatch();
	const category = props.match.params.category;

	useEffect(() => {
		setShouldDisplayLoader(true);
		dispatch(fetchProducts(category));
	}, [category, dispatch]);

	useEffect(() => {
		setShouldDisplayLoader(false);
	}, [products]);

	const renderContent = () => {
		if (products.length !== 0) {
			return products.map((product) => {
				const avaible = product.in - product.out - product.reserved;

				if (avaible === 0) {
					return '';
				}

				if (product.deleted_at) {
					return '';
				}

				return (
					<Product
						product={product}
						setShouldDisplayModal={setShouldDisplayModal}
					/>
				);
			});
		} else {
			return "No hay productos.";
		}
	};

	const dimmerWidth = window.innerWidth - 220;
	const mainHeight = window.innerHeight;

	return (
		<div>
			<Dimmer
				className="main-wrapper"
				style={{ width: dimmerWidth, height: mainHeight }}
				active={shouldDisplayLoader}
			>
				<Loader />
			</Dimmer>
			<div className="main-wrapper" style={{ height: mainHeight }}>
				<h2>Categoria: {category} </h2>

				<div className="products-wrapper">{renderContent()}</div>

				{shouldDisplayModal && (
					<Modal setShouldDisplayModal={setShouldDisplayModal} />
				)}
			</div>
		</div>
	);
};

export default Products;

// <Modal
// 		      onClose={() => setOpen(false)}
// 		      onOpen={() => setOpen(true)}
// 		      open={open}
// 		    >
// 		      <Modal.Header>Producto</Modal.Header>
// 		      <Modal.Content image>
// 		        <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
// 		        <Modal.Description>
// 		          <Header>Producto</Header>

// 	        		{renderModal()}
// 		        </Modal.Description>
// 		      </Modal.Content>
// 		      <Modal.Actions>
// 		        <Button color='black' onClick={() => setOpen(false)}>
// 		          Nope
// 		        </Button>
// 		        <Button
// 		          content="Yep, that's me"
// 		          labelPosition='right'
// 		          icon='checkmark'
// 		          onClick={() => setOpen(false)}
// 		          positive
// 		        />
// 		      </Modal.Actions>
// 		    </Modal>

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
