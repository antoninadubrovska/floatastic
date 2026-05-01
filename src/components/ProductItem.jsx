import { Link } from "react-router";

const ProductItem = ({ item }) => (
	<div className="product-item product-card-preview">
		<p className="product-card-preview-name">{item.name}</p>
		<p className="product-card-preview-price">{item.price} kr</p>
		<Link to={"/products/" + item.id} className="link-read-more">
			Read more...
		</Link>
	</div>
);

export default ProductItem;
