import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Transition, Icon } from 'semantic-ui-react';
import { removeProduct } from '../actions';
import './Main.css';

const Cart = () => {
	const cart = useSelector(store => store.cart);
	const [visibility, setVisibility] = useState(false);
	const dispatch = useDispatch();
	const mainWidth = window.innerWidth - 220 - 17;
	
	const renderContent = () => {
		return cart.map(product => {
			const price = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.product_id.price);
			const total_price = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.quantity * product.product_id.price);

			return(
				<Table.Row key={product._id}>
	        <Table.Cell>{product.product_id.name}</Table.Cell>
	        <Table.Cell>{product.product_id.brand}</Table.Cell>
	        <Table.Cell>{product.product_id.presentation}</Table.Cell>
	        <Table.Cell textAlign='center'>{product.quantity}</Table.Cell>
	        <Table.Cell textAlign='center'>{price}</Table.Cell>
	        <Table.Cell textAlign='center'>{total_price}</Table.Cell>
	        <Table.Cell collapsing={true}><Icon onClick={() => deleteProduct(product._id)} color='red' name='delete' /></Table.Cell>
	      </Table.Row>
			)
		})
	}

	const calcTotal = () => {
		var total = 0;

		cart.forEach(product => {
			total += product.quantity * product.product_id.price;
		});

		return(new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total));
	}

	const deleteProduct = (product_id) => {
		dispatch(removeProduct(product_id));
	}

	useEffect(() => {
		setVisibility(true);
	}, [])

	return(
		<Transition visible={visibility} animation='scale' duration={500}>
		<div className='main-wrapper' style={{ width: mainWidth }}>
			 <Table basic>
		    <Table.Header>
		      <Table.Row style={{backgroundColor: '#d9d9d9'}}>
		        <Table.HeaderCell>Producto</Table.HeaderCell>
		        <Table.HeaderCell>Marca</Table.HeaderCell>
		        <Table.HeaderCell>Presentación</Table.HeaderCell>
		        <Table.HeaderCell textAlign='center'>Cantidad</Table.HeaderCell>
		        <Table.HeaderCell textAlign='center'>Precio Unitario</Table.HeaderCell>
		        <Table.HeaderCell textAlign='center'>Precio Total</Table.HeaderCell>
		        <Table.HeaderCell collapsing={true}></Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>

		    <Table.Body style={{backgroundColor: 'white'}}>
		      { renderContent() }
		      <Table.Row key='total'>
		        <Table.Cell></Table.Cell>
		        <Table.Cell></Table.Cell>
		        <Table.Cell></Table.Cell>
		        <Table.Cell textAlign='center'></Table.Cell>
		        <Table.Cell textAlign='center' style={{ fontWeight: 'bold' }}>TOTAL</Table.Cell>
		        <Table.Cell textAlign='center' style={{ fontWeight: 'bold' }}>{ calcTotal() }</Table.Cell>
		        <Table.Cell collapsing={true}></Table.Cell>
		      </Table.Row>
		    </Table.Body>
		  </Table>
		</div>
		</Transition>
	);
}

export default Cart;