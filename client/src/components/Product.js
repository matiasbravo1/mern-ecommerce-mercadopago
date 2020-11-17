import { Icon } from 'semantic-ui-react';
import './Product.css';

const Product = () => {
	return(
		<div className="card1">
			<div className="card2">
				<div className="card-img">
				</div>
				<div className="text-container">
					<p className="text-name">nombre</p>
					<p className="text-brand">marca</p>
					<p className="text-presentation">presentacion</p>
				</div>
				<div className="card-footer">
					<div className="card-price">
						<p className="text-price">$ 654,55</p>
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