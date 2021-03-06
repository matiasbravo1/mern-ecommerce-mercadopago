import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import messageReducer from "./messageReducer";
import categoriesReducer from "./categoriesReducer";

export default combineReducers({
	auth: authReducer,
	products: productsReducer,
	product: productReducer,
	cart: cartReducer,
	message: messageReducer,
	categories: categoriesReducer,
});
