import { FETCH_CATEGORIES } from "../actions/types";

export default function foo(state = [], action) {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload || false;
		default:
			return state;
	}
}
