import { useParams } from "react-router";
import { useEffect } from "react";
//import { getImageUrl } from "../utils/getImageUrl";
import { useProductsStore } from "../store/useProductsStore";
import { Link } from "react-router";
import { useBuyNow } from "../hooks/useBuyNow";
import { useProductImage } from "../hooks/useProductImage";

const ProductDetails = () => {
	const { id } = useParams();
	//const navigate = useNavigate();

	const { products, fetchProducts } = useProductsStore();


	useEffect(() => {
		if (products.length === 0) {
			fetchProducts();
		}
	}, [products.length, fetchProducts]);

	// find item after it exists
	const item = products.find((i) => i.id === id);

	//buy
	const buyNow = useBuyNow()


	const imageUrl = useProductImage(item?.image);

	// loading guard
	if (!item) {
		return <div className="loading product-details"> Loading product...</div>;
	}

	return (
		<div className="product-details product-card">
			<img
				className="product-card-image"
				src={imageUrl || item.image}
				alt={item.name}
			/>
			<h2 className="product-card-name">{item.name}</h2>

			<p className="product-card-details-description">{item.details}</p>

			<p className="product-card-price">{item.price} kr</p>

			{/* buy */}
			<button className="buy-btn" onClick={() => buyNow(item)}>
				Buy
			</button>

			<Link className="link-go-back" to="/products">
				Go Back
			</Link>
		</div>
	);
};

export default ProductDetails;
