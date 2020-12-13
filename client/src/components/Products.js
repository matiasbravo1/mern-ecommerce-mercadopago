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
	const subcategory = props.match.params.subcategory;

	useEffect(() => {
		window.scrollTo(0, 0);
		setShouldDisplayLoader(true);
		dispatch(fetchProducts(category, subcategory));
	}, [category, subcategory, dispatch]);

	useEffect(() => {
		setShouldDisplayLoader(false);
	}, [products]);

	const renderContent = () => {
		if (products.length !== 0) {
			return products.map((product) => {
				const avaible = product.in - product.out - product.reserved;

				if (avaible === 0) {
					return "";
				}

				if (product.deleted_at) {
					return "";
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
				<div className="products-wrapper">{renderContent()}</div>

				{shouldDisplayModal && (
					<Modal setShouldDisplayModal={setShouldDisplayModal} />
				)}
			</div>
		</div>
	);
};

export default Products;
