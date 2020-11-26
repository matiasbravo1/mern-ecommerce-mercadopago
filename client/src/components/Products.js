import React from 'react';
import { Button, Modal, Image, Header } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions';
import Product from './Product';
import './Main.css';

const Products = props => {
	const [open, setOpen] = useState(false);
	const [productoSel, setProduct] = useState({});

	const products = useSelector(store => store.products);
	const dispatch = useDispatch();
	const category = props.match.params.category;

	useEffect(() => {		
        dispatch(fetchProducts(category));
    }, [ category, dispatch ]);

	const renderContent = () => {
		if (products.length !== 0){
			return products.map( product => {
				
				return(
					<Product 
						product={ product } 
						openModal={() => setOpen(true)}
						setProducto={() => setProduct( product )}
					/>
				)
			});
		}else{
			return "No hay productos.";
		}
	}

	const renderModal = () => {
		let content = [];
	    

	    if (productoSel) {
		    const cant = productoSel.in - productoSel.out - productoSel.reserved;

		    for (let i = 1; i <= cant; i++) {
		      content.push(<div style={{ height: '50px', width: '50px', border: '1px solid black' }} key={i}>{i}</div>)
		    }
		}
	    
	    return content;
	}

	return(
		<div className='main-wrapper'> 
	        <h2>Categoria: { category } </h2>
	        <div style={{display: 'flex'}}>
	        	{renderContent()}
	        </div>

	        
	        <Modal
		      onClose={() => setOpen(false)}
		      onOpen={() => setOpen(true)}
		      open={open}
		    >
		      <Modal.Header>Producto</Modal.Header>
		      <Modal.Content image>
		        <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
		        <Modal.Description>
		          <Header>Producto</Header>
		          	
	        		{renderModal()}
		        </Modal.Description>
		      </Modal.Content>
		      <Modal.Actions>
		        <Button color='black' onClick={() => setOpen(false)}>
		          Nope
		        </Button>
		        <Button
		          content="Yep, that's me"
		          labelPosition='right'
		          icon='checkmark'
		          onClick={() => setOpen(false)}
		          positive
		        />
		      </Modal.Actions>
		    </Modal>
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

