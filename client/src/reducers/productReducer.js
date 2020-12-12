import { SELECT_PRODUCT } from "../actions/types";

export default function foo(state = {}, action) {
	switch (action.type) {
		case SELECT_PRODUCT:
			return action.payload || false;
		default:
			return state;
	}
}
