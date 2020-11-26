import axios from 'axios';
import { FETCH_USER, FETCH_PRODUCTS, SELECT_PRODUCT } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProducts = (category) => async dispatch => {
  const res = await axios.get('/api/search_products/'+category);

  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

export const selectProduct = (product) => {
  return {
    type: SELECT_PRODUCT,
    payload: product
  }
};