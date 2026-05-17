import { Link } from "react-router";
import { useBuyNow } from "../hooks/useBuyNow";
import { useProductImage } from "../hooks/useProductImage";

//buy
const ProductItem = ({ item }) => {
	const buyNow = useBuyNow();


	// temporary solution
	// Firebase image handling
	const firebaseImageUrl = useProductImage(item?.image);
	const isExternalUrl = (value) => /^https?:\/\//.test(value);
	const finalImage = isExternalUrl(item?.image)
	? item.image
	: firebaseImageUrl;

	return (
		<div className="product-item product-card-preview">

			{/* Firebase storage image handling */}
			{/* {firebaseImageUrl && (
				<img
					className="product-card-image-preview"
					src={firebaseImageUrl}
					alt={item.name}
				/>
			)} */}

			{/* temporary solution */}

			{finalImage && (
				<img
					className="product-card-image-preview"
					src={finalImage}
					alt={item.name}
				/>
			)}

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
};;

export default ProductItem;
