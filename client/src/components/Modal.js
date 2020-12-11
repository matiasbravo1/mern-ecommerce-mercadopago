import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../actions";

function ModalExampleModal({ setShouldDisplayModal }) {
	const product = useSelector((store) => store.product);
	const dispatch = useDispatch();

	const addToCart = (quantity) => {
		dispatch(addProduct(product._id, quantity));
		setShouldDisplayModal(false);
	};

	let quantity = product.in - product.out - product.reserved;

	let content = [];

	for (let i = 1; i <= quantity; i++) {
		content.push(
			<Button onClick={() => addToCart(i)} color="teal">
				{i}
			</Button>
		);
	}

	return (
		<Modal open={true} onClose={() => setShouldDisplayModal(false)}>
			<Modal.Content>
				<Modal.Description>
					<Header textAlign="center">
						¿Qué cantidad desea agregar al carrito?
					</Header>
					<div style={{ textAlign: "center" }}>{content}</div>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => setShouldDisplayModal(false)}>
					Cancelar
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalExampleModal;
