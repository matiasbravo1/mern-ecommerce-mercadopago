import React from "react";
import Categories from "./Categories";
import "./SidebarModal.css";

const SidebarModal = ({ visibility, setVisibility }) => {
	return (
		<div style={{ display: visibility }}>
			<div className="dimmer" onClick={() => setVisibility("none")}></div>

			<div className="list">
				<h2>Productos</h2>
				<Categories setVisibility={setVisibility} />
			</div>
		</div>
	);
};

export default SidebarModal;
