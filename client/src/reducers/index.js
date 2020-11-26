import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import productReducer from './productReducer';

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  product: productReducer
});
