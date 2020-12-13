import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = ({ setVisibility }) => {
	const categories = useSelector((store) => store.categories);
	const [activeItem, handleItemClick] = useState("");

	const renderContent = () => {
		const mapSubcategories = (category, subcategory) => {
			return subcategory.map((subcat) => {
				return (
					<Menu.Item
						as={Link}
						to={"/products/" + category + "/" + subcat._id}
						active={activeItem === subcat.subcategory}
						onClick={() => {
							onSubCatClick();
							handleItemClick(subcat.subcategory);
						}}
						name={subcat.subcategory}
					>
						{subcat.subcategory}
					</Menu.Item>
				);
			});
		};

		return categories.map((category) => {
			return (
				<Menu.Item>
					{category.category}
					<Menu.Menu style={{ marginLeft: "0.1rem" }}>
						{mapSubcategories(category._id, category.subcategories)}
					</Menu.Menu>
				</Menu.Item>
			);
		});
	};

	const onSubCatClick = () => {
		if (setVisibility) {
			setVisibility("none");
		}
	};

	return (
		<div>
			<Menu vertical fluid className="menu-categories">
				{renderContent()}
			</Menu>
		</div>
	);
};

export default Categories;
