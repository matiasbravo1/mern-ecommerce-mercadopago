import React from "react";
import "./ProductsList.css";

const ProductsList = ({ visibility, setVisibility }) => {
	return (
		<div style={{ display: visibility }}>
			<div className="dimmer" onClick={() => setVisibility("none")}></div>

			<div className="list"></div>
		</div>
	);
};

export default ProductsList;
