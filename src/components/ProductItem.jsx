import { Link } from "react-router";
import { useBuyNow } from "../hooks/useBuyNow";
import { useProductImage } from "../hooks/useProductImage";

//buy
const ProductItem = ({ item }) => {
	const buyNow = useBuyNow();

	const imageUrl = useProductImage(item?.image);

	return (
		<div className="product-item product-card-preview">
			<img
				className="product-card-image-preview"
				src={imageUrl || item.image}
				alt={item.name}
			/>
			<p className="product-card-preview-name">{item.name}</p>
			<p className="product-card-preview-price">{item.price} kr</p>
			<Link to={"/products/" + item.id} className="link-read-more">
				Read more...
			</Link>

			<button className="buy-btn" onClick={() => buyNow(item)}>
				Buy
			</button>
		</div>
	);
};

export default ProductItem;
