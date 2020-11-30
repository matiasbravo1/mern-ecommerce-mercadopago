import axios from 'axios';
import { FETCH_USER, FETCH_PRODUCTS, SELECT_PRODUCT, CART_PRODUCTS, MESSAGE } from './types';

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

export const addProduct = (product_id, quantity) => async dispatch => {

  const res = await axios.post('/api/add_product/', { product_id, quantity });
  
  if (!res.data.error){
    dispatch({ type: CART_PRODUCTS, payload: res.data });
    dispatch({ type: MESSAGE, payload: { message:'Producto agregado al carrito.', color: 'green'} });
  }else{
    dispatch({ type: MESSAGE, payload: { message: res.data.error, color: 'red'} });
  }
};

export const removeProduct = (product_id) => async dispatch => {
  const res = await axios.post('/api/remove_product/', { product_id });
  
  if (!res.data.error){
    dispatch({ type: CART_PRODUCTS, payload: res.data });
  }else{
    dispatch({ type: MESSAGE, payload: { message: res.data.error, color: 'red'} });
  }
};

export const fetchCart = () => async dispatch => {
  const res = await axios.get('/api/fetch_cart/');
  
  if (!res.data.error){
    dispatch({ type: CART_PRODUCTS, payload: res.data });
  }
}

export const setMessage = (message, color) => {
  return {
    type: MESSAGE,
    payload: { message: message, color: color }
  }
}