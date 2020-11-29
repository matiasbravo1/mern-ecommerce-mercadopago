import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import './Main.css';

const Cart = () => {
	const cart = useSelector(store => store.cart);

	const renderContent = () => {
		return cart.map(product => {
			return(
					<Table.Row key={product._id}>
		        <Table.Cell>{product.product_id.name}</Table.Cell>
		        <Table.Cell>{product.product_id.brand}</Table.Cell>
		        <Table.Cell>{product.product_id.presentation}</Table.Cell>
		        <Table.Cell>{product.quantity}</Table.Cell>
		        <Table.Cell>{product.product_id.price}</Table.Cell>
		        <Table.Cell>{product.quantity * product.product_id.price}</Table.Cell>
		      </Table.Row>
				)
		})
	}

	const mainWidth = window.innerWidth - 220;

	return(
		<div className='main-wrapper' style={{ width: mainWidth }}>
			  <Table basic>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Producto</Table.HeaderCell>
        <Table.HeaderCell>Marca</Table.HeaderCell>
        <Table.HeaderCell>Presentación</Table.HeaderCell>
        <Table.HeaderCell>Cantidad</Table.HeaderCell>
        <Table.HeaderCell>Precio Unitario</Table.HeaderCell>
        <Table.HeaderCell>Precio Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { renderContent() }
    </Table.Body>
  </Table>
		</div>
	);
}

export default Cart;