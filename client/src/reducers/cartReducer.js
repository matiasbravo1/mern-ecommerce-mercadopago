import { CART_PRODUCTS } from "../actions/types";

export default function foo(state = [], action) {
	switch (action.type) {
		case CART_PRODUCTS:
			return action.payload || false;
		default:
			return state;
	}
}
