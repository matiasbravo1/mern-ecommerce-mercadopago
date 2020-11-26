import { Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../actions';
import './Product.css';

const Product = ({ product, setShouldDisplayModal }) => {

	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(selectProduct(product));
		setShouldDisplayModal(true);
	}

	return(
		<div className="card1">
			<div className="card2">
				<div className="card-img">
				</div>
				<div className="text-container">
					<p className="text-name">{product.name}</p>
					<p className="text-brand">{product.brand}</p>
					<p className="text-presentation">{product.presentation}</p>
				</div>
				<div className="card-footer">
					<div className="card-price">
						<p className="text-price">$ {product.price}</p>
					</div>
					<div className="card-carrito">
						<Icon onClick={() => addToCart()} name='cart plus' size='large' />
					</div>
				</div>
			</div>
		</div>
	);

}

export default Product;