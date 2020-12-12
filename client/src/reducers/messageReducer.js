import { MESSAGE } from "../actions/types";

export default function foo(state = {}, action) {
	switch (action.type) {
		case MESSAGE:
			return action.payload || {};
		default:
			return state;
	}
}
