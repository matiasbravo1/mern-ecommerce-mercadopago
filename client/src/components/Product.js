import { Icon } from 'semantic-ui-react';
import './Product.css';

const Product = ({ product }) => {
	return(
		<div className="card1">
			<div className="card2">
				<div className="card-img">
				</div>
				<div className="text-container">
					<p className="text-name">{product.name}</p>
					<p className="text-brand">{product.description}</p>
					<p className="text-presentation">{product.code}</p>
				</div>
				<div className="card-footer">
					<div className="card-price">
						<p className="text-price">$ {product.price}</p>
					</div>
					<div className="card-carrito">
						<Icon name='cart plus' size='large' />
					</div>
				</div>
			</div>
		</div>
	);

}

export default Product;