import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Transition, Icon } from "semantic-ui-react";
import {
	removeProduct,
	plusOne,
	minusOne,
	setMessage,
	fetchCart,
} from "../actions";
import "./Main.css";
import "./Cart.css";

const Cart = () => {
	const cart = useSelector((store) => store.cart);
	const [visibility, setVisibility] = useState(false);
	const [shouldDisplayLoader, setShouldDisplayLoader] = useState("none");
	const dispatch = useDispatch();

	const renderContent = () => {
		return cart.map((product) => {
			const price = new Intl.NumberFormat("es-AR", {
				style: "currency",
				currency: "ARS",
			}).format(product.product_id.price);
			const total_price = new Intl.NumberFormat("es-AR", {
				style: "currency",
				currency: "ARS",
			}).format(product.quantity * product.product_id.price);
			const avaible =
				product.product_id.in -
				product.product_id.out -
				product.product_id.reserved;

			var no_stock = "";
			if (avaible < product.quantity) {
				no_stock = "Stock insuficiente.";
			}

			return (
				<Table.Row key={product._id}>
					<Table.Cell>{product.product_id.name}</Table.Cell>
					<Table.Cell>{product.product_id.brand}</Table.Cell>
					<Table.Cell>{product.product_id.presentation}</Table.Cell>

					{product.product_id.deleted_at ? (
						<>
							<Table.Cell textAlign="center" style={{ color: "red" }}>
								Producto eliminado.
							</Table.Cell>
							<Table.Cell textAlign="center"></Table.Cell>
							<Table.Cell textAlign="center"></Table.Cell>
						</>
					) : (
						<>
							<Table.Cell textAlign="center">
								<Icon
									onClick={() => minusOneCart(product._id, product.quantity)}
									link={true}
									color="red"
									name="minus square outline"
								/>
								{product.quantity}
								<Icon
									onClick={() => plusOneCart(product._id)}
									link={true}
									color="green"
									name="plus square outline"
									style={{ marginLeft: "4px" }}
								/>
								<p style={{ color: "red" }}>{no_stock}</p>
							</Table.Cell>
							<Table.Cell textAlign="center">{price}</Table.Cell>
							<Table.Cell textAlign="center">{total_price}</Table.Cell>
						</>
					)}

					<Table.Cell collapsing={true}>
						<Icon
							onClick={() => deleteProduct(product._id)}
							link={true}
							color="red"
							name="delete"
						/>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	const calcTotal = () => {
		var total = 0;

		cart.forEach((product) => {
			if (product.product_id.deleted_at) {
				return;
			}

			const avaible =
				product.product_id.in -
				product.product_id.out -
				product.product_id.reserved;

			if (avaible < product.quantity) {
				return;
			}

			total += product.quantity * product.product_id.price;
		});

		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(total);
	};

	const deleteProduct = async (product_id) => {
		setShouldDisplayLoader("block");
		await dispatch(removeProduct(product_id));
		setShouldDisplayLoader("none");
	};

	const plusOneCart = async (product_id) => {
		setShouldDisplayLoader("block");
		await dispatch(plusOne(product_id));
		setShouldDisplayLoader("none");
	};

	const minusOneCart = async (product_id, quantity) => {
		if (quantity === 1) {
			dispatch(setMessage("Cantidad no puede ser cero.", "red"));
			return;
		}

		setShouldDisplayLoader("block");
		await dispatch(minusOne(product_id));
		setShouldDisplayLoader("none");
	};

	useEffect(() => {
		dispatch(fetchCart());

		setVisibility(true);
	}, []);

	return (
		<Transition visible={visibility} animation="scale" duration={500}>
			<div className="main-wrapper">
				<Table basic unstackable>
					<Table.Header>
						<Table.Row style={{ backgroundColor: "#d9d9d9" }}>
							<Table.HeaderCell>Producto</Table.HeaderCell>
							<Table.HeaderCell>Marca</Table.HeaderCell>
							<Table.HeaderCell>Presentación</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Cantidad</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">
								Precio Unitario
							</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">
								Precio Total
							</Table.HeaderCell>
							<Table.HeaderCell collapsing={true}></Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body style={{ backgroundColor: "white" }}>
						{renderContent()}
						<Table.Row key="total">
							<Table.Cell></Table.Cell>
							<Table.Cell></Table.Cell>
							<Table.Cell></Table.Cell>
							<Table.Cell textAlign="center"></Table.Cell>
							<Table.Cell textAlign="center" style={{ fontWeight: "bold" }}>
								TOTAL
							</Table.Cell>
							<Table.Cell textAlign="center" style={{ fontWeight: "bold" }}>
								{calcTotal()}
							</Table.Cell>
							<Table.Cell collapsing={true}></Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>

				<div className="icon-loader" style={{ display: shouldDisplayLoader }}>
					<Icon name="spinner" loading={true} size="big" color="blue" />
				</div>
			</div>
		</Transition>
	);
};

export default Cart;
